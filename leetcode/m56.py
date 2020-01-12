class Solution(object):
    def merge(self, intervals):
        """
        :type intervals: List[List[int]]
        :rtype: List[List[int]]
        """
        intervals.sort(key = lambda v: v[0])

        ans = []
        i = None
        for l,u in intervals:
            if i is None:
                ans.append([l, u])
                i = 0
                continue

            prev = ans[i]
            _u = prev[1]
            if u > _u and l <= _u:
                ans[i] = [prev[0], u]
            elif l > _u:
                i+=1
                ans.append([l, u])

        return ans
