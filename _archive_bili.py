# -*- coding: utf-8 -*-
# B站全量文本快照:对每个 BVID 调官方 view API,存标题/UP/时长/播放/简介/封面/分P数
# 输出: archive-bili.json(全量) + 失败列表。带限流间隔,可断点续跑。
import json, time, sys, os, urllib.request, urllib.error

BV_FILE = "_allbv.txt"
OUT = "archive-bili.json"
FAIL = "_bili_fail.txt"
API = "https://api.bilibili.com/x/web-interface/view?bvid="
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
SLEEP = 0.7          # 每条间隔,防限流
RETRY = 2

def fetch(bv):
    req = urllib.request.Request(API + bv, headers={"User-Agent": UA, "Referer": "https://www.bilibili.com"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read().decode("utf-8"))

def main():
    bvs = [l.strip() for l in open(BV_FILE, encoding="utf-8") if l.strip()]
    # 断点续跑:已存在的结果跳过
    done = {}
    if os.path.exists(OUT):
        try:
            done = {x["bvid"]: x for x in json.load(open(OUT, encoding="utf-8"))}
        except Exception:
            done = {}
    results = dict(done)
    fails = []
    total = len(bvs)
    for i, bv in enumerate(bvs, 1):
        if bv in results:
            continue
        ok = False
        for attempt in range(RETRY + 1):
            try:
                d = fetch(bv)
                code = d.get("code")
                if code == 0:
                    v = d["data"]
                    results[bv] = {
                        "bvid": bv,
                        "title": v.get("title", ""),
                        "up": v.get("owner", {}).get("name", ""),
                        "mid": v.get("owner", {}).get("mid", 0),
                        "duration": v.get("duration", 0),
                        "view": v.get("stat", {}).get("view", 0),
                        "like": v.get("stat", {}).get("like", 0),
                        "pubdate": v.get("pubdate", 0),
                        "videos": v.get("videos", 1),
                        "desc": (v.get("desc", "") or "")[:1000],
                        "pic": v.get("pic", ""),
                        "tname": v.get("tname", ""),
                        "status": "ok",
                    }
                    ok = True
                else:
                    # code 非0:视频已删/不可见,记录状态
                    results[bv] = {"bvid": bv, "status": "gone", "code": code, "msg": d.get("message", "")}
                    ok = True
                break
            except Exception as e:
                if attempt < RETRY:
                    time.sleep(2)
                else:
                    fails.append(bv + "\t" + str(e)[:80])
        if i % 50 == 0:
            json.dump(list(results.values()), open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            print(f"[{i}/{total}] saved, ok={sum(1 for x in results.values() if x.get('status')=='ok')} gone={sum(1 for x in results.values() if x.get('status')=='gone')}", flush=True)
        time.sleep(SLEEP)
    # 收尾
    json.dump(list(results.values()), open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    open(FAIL, "w", encoding="utf-8").write("\n".join(fails))
    okc = sum(1 for x in results.values() if x.get("status") == "ok")
    gonec = sum(1 for x in results.values() if x.get("status") == "gone")
    print(f"DONE total={total} ok={okc} gone={gonec} fail={len(fails)}", flush=True)

if __name__ == "__main__":
    main()
