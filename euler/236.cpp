/**
 * Lessons learned:
 * (1) Fractions are better than floating point numbers when trying to compute
 *     equality.
 * (2) When a solution seems like it cannot be optimized further due to some
 *     fundamental restriction (e.g. structure of data, structure of problem -
 *     recursive, non-recursive, etc.) the best approach is probably to abandon
 *     that solution and try other ones that are fundamentally different. Try
 *     framing the question differently - disregard any subjective aspect of
 *     previous solutions.
 * (3) Keep working at it! Revisit the question often - sometimes, the answer
 *     is hidden in the question itself, but were ignored or deemed unimportant
 *     in earlier stages of solutioning.
 * (4) Solve the question naively, so when optimizing, there is always a fallback
 *     solution upon which can be referenced to assess the correctness of the
 *     current solution. Often times, a faster solution misses cases which are
 *     covered in naive and more complete solutions.
 */
#include <iostream>
#include <array>
#include <sstream>
#include <vector>

using namespace std;

vector<int *> posses;

class Fraction {
    int u;
    int v;
private:
    int gcm(int u, int v) {
        return v == 0 ? u : gcm(v, u % v);
    }
    void lcd() {
        int _gcm = gcm(u, v);
        u = (u / _gcm);
        v = (v / _gcm);
    }
public:
    Fraction(int u, int v){
        this->u = u;
        this->v = v;
        lcd();
    }
    friend bool operator==(const Fraction &lhs, const Fraction &rhs) {
        return lhs.u == rhs.u &&
                lhs.v == rhs.v;
    }
    double evaluate() {
        return (double) u / (double) v;
    }
    string to_string() {
        return std::to_string(u) + "/" + std::to_string(v);
    }
};

bool compute_truth_table(int *products, int *spoilages, int n) {
    /*
     * Start from the last index:
     * If current index is below threshold, increment, set is_updated to true
     * If current index is at threshold, zero current index.
     *      Keep decrementing index and apply the same logic
     */
    bool is_updated = false;
    products += (n - 1);
    spoilages += (n - 1);
    for (int i = (n - 1); i >= 0; --i, --products, --spoilages) {
        if (*spoilages < *products) {
            (*spoilages)++;
            is_updated = true;
            break;
        }

        *spoilages = 1;
    }

    return is_updated;
}

int *cpy_poss(const int *poss, int n, int ind, int a_si, int b_si) {
    int *poss_cpy = new int[n];
    for (int i = 0; i < n; i++) {
        poss_cpy[i] = poss[i];
    }

    poss_cpy[ind] = a_si;
    poss_cpy[ind + n/2] = b_si;
    return poss_cpy;
}

void test(Fraction *m, const int *products, int n, int i, int *poss) {
    // base case
    if (i == (n/2)) {
        posses.push_back(poss);
        return;
    }

    int *p = new int[2];
    p[0] = *(products + i); // a_i
    p[1] = *(products + i + (n/2)); // b_i

    int *s = new int[2];
    s[0] = 1; // a_si
    s[1] = 0; // b_si

    Fraction *curr_m;
    while (compute_truth_table(p, s, 2)) {
        curr_m = new Fraction(p[0] * s[1], p[1] * s[0]);

        bool passes = m == nullptr
            ? true
            : (*curr_m == *m) && (curr_m->evaluate() > 1);

        if (passes) {
            int *poss_cpy = cpy_poss(poss, n, i, s[0], s[1]);
            test(curr_m, products, n, i+1, poss_cpy);
        }

        delete curr_m;
    }

    delete [] poss;
    delete [] p;
    delete [] s;
}

Fraction *left_side(int *products, int *spoilages, int n) {
    int half = n / 2;

    int A = 0, B = 0, A_s = 0, B_s = 0;
    for (int i = 0; i < half; i++, products++, spoilages++) {
        A += *products;
        B += *(products + half);
        A_s += *spoilages;
        B_s += *(spoilages + half);
    }

    return new Fraction(B * A_s, A * B_s);
}

Fraction *right_side(const int *products, const int *spoilages, int n) {
    int half = n / 2;

    int a_i = *products;
    int a_si = *spoilages;
    int b_i = *(products + half);
    int b_si = *(spoilages + half);

    return new Fraction(a_i * b_si, b_i * a_si);
}

Fraction *test(int *products, int *spoilages, int n) {
    Fraction *right_m = right_side(products, spoilages, n);
    Fraction *left_m = left_side(products, spoilages, n);

    bool passes = *right_m == *left_m;

    delete left_m;
    return passes ? right_m : nullptr;
}

int *read_multi_line(int n) {
    string s1, s2;
    getline(cin, s1);
    getline(cin, s2);

    int *input = new int[n];
    string delimiter = " ";

    size_t last = 0;
    size_t next = 0;
    int *curr = input;
    while ((next = s1.find(delimiter, last)) != string::npos) {
        *curr++ = stoi(s1.substr(last, next-last));
        last = next + 1;
    }

    *curr++ = stoi(s1.substr(last));

    last = 0;
    next = 0;
    while ((next = s2.find(delimiter, last)) != string::npos) {
        *curr++ = stoi(s2.substr(last, next-last));
        last = next + 1;
    }

    *curr = stoi(s2.substr(last));
    return input;
}

int main() {
    string in_str0;
    int n;
    getline(cin, in_str0);
    stringstream instr(in_str0);
    instr >> n;
    n *= 2;
    int *input = read_multi_line(n);
    int *spoilages = new int[n];

    int *p = spoilages;
    for (int i = 0; i < n; i++) {
        *p++ = 1;
    }

    test(nullptr, input, n, 0, spoilages);
    for (auto const& poss : posses) {
        Fraction *ans = test(input, poss, n);
        if (ans != nullptr) {
            cout << ans->to_string() << endl;
            delete ans;
            break;
        }
    }

    delete[] input;
    delete[] spoilages;
}
