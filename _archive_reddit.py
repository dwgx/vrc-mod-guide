# -*- coding: utf-8 -*-
# reddit wayback 指针:对每个帖查 CDX,取最近一次状态200的存档时间戳+URL。
# 不抓正文(质量不可控),只固化"存档存在性+指针"。原帖删了存档链接仍可用。
import json, time, os, urllib.request

RD_FILE = "_allreddit.txt"
OUT = "archive-reddit.json"
# 用 * 前缀匹配:主帖精确快照常不存在,但评论级快照证明该帖已存档,指针成立
CDX = "http://web.archive.org/cdx/search/cdx?url={}*&output=json&filter=statuscode:200&collapse=urlkey&limit=1"
UA = "Mozilla/5.0 (archive-indexer)"
SLEEP = 0.4
RETRY = 2

def cdx(url):
    req = urllib.request.Request(CDX.format(url), headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as r:
        return json.loads(r.read().decode("utf-8"))

def main():
    urls = [l.strip() for l in open(RD_FILE, encoding="utf-8") if l.strip()]
    done = {}
    if os.path.exists(OUT):
        try:
            done = {x["url"]: x for x in json.load(open(OUT, encoding="utf-8"))}
        except Exception:
            done = {}
    results = dict(done)
    total = len(urls)
    for i, u in enumerate(urls, 1):
        if u in results and results[u].get("archived") is not None:
            continue  # 已成功(True/False)才跳过;None(超时/错误)重试
        rec = None
        for attempt in range(RETRY + 1):
            try:
                rows = cdx(u)
                if len(rows) > 1:
                    _, ts, orig, mime, sc, digest, length = rows[1]
                    rec = {
                        "url": u,
                        "archived": True,
                        "timestamp": ts,
                        "wayback": f"https://web.archive.org/web/{ts}/{orig}",
                    }
                else:
                    rec = {"url": u, "archived": False}
                break
            except Exception as e:
                if attempt < RETRY:
                    time.sleep(3)
                else:
                    rec = {"url": u, "archived": None, "err": str(e)[:60]}
        results[u] = rec
        if i % 50 == 0:
            json.dump(list(results.values()), open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            arch = sum(1 for x in results.values() if x.get("archived") is True)
            print(f"[{i}/{total}] saved, archived={arch}", flush=True)
        time.sleep(SLEEP)
    json.dump(list(results.values()), open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    arch = sum(1 for x in results.values() if x.get("archived") is True)
    noarch = sum(1 for x in results.values() if x.get("archived") is False)
    print(f"DONE total={total} archived={arch} no_archive={noarch}", flush=True)

if __name__ == "__main__":
    main()
