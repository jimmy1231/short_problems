function dfs(videos, friends, currDepth, depth, id, ans, closed) {
  closed[id] = true;
  if (currDepth === depth) {
    let currVideos = videos[id], video;
    let _i;
    for (_i=0; _i<currVideos.length; _i++) {
      video = currVideos[_i];
      if (!ans.hasOwnProperty(video)) {
        ans[video] = 1;
      } else {
        ans[video]++;
      }
    }
    return;
  }

  let currFriends = friends[id], friend;
  let i;
  for (i=0; i<currFriends.length; i++) {
    friend = currFriends[i];
    if (!closed.hasOwnProperty(friend)) {
      dfs(videos, friends, currDepth+1, depth, friend, ans, closed);
    }
  }
}

function bfs(videos, friends, id, level, ans) {
  let q = [];
  let friendsG = [];

  /* Construct graph */
  friends.forEach((f, i) => {
    friendsG[i] = {
      id: i,
      state: i === id ? 'G' : 'W',
      val: i === id ? 0 : Infinity,
      adj: f
    };
  });

  let curr;
  q.push(id);
  while (q.length > 0) {
    curr = friendsG[q.shift()];
    curr.adj.forEach(f => {
      let friend = friendsG[f];
      if (friend.state === 'W') {
        friend.state = 'G';
        friend.val = curr.val+1;
        q.push(f);
      }
    });
    curr.state = 'B';
  }

  let candidates = [];
  let i;
  for (i=0; i<friendsG.length; i++) {
    if (friendsG[i].val === level) {
      candidates.push(i);
    }
  }

  let _videos;
  for (i=0; i<candidates.length; i++) {
    _videos = videos[candidates[i]];
    _videos.forEach(v => {
      if (!ans.hasOwnProperty(v)) {
        ans[v] = 1;
      } else {
        ans[v]++;
      }
    });
  }
}

/**
 * @param {string[][]} watchedVideos
 * @param {number[][]} friends
 * @param {number} id
 * @param {number} level
 * @return {string[]}
 */
var watchedVideosByFriends = function(watchedVideos, friends, id, level) {
  let ans = {};
  bfs(watchedVideos, friends, id, level, ans);
  return Object.entries(ans).sort((c1, c2) => {
    let c1_freq = c1[1], c2_freq = c2[1];
    if (c1_freq-c2_freq !== 0) {
      return c1_freq-c2_freq;
    } else {
      return c1[0].localeCompare(c2[0]);
    }
  }).map(e => e[0]);
};
