#include "pe.h"
#define INITIAL_INTERVAL 1.0
#define EXPANSION_INTERVAL 0.001

std::string get_precision(int precision, double d) {
    std::ostringstream streamObj;
    streamObj << std::fixed;
    streamObj << std::setprecision(precision);
    streamObj << d;

    return streamObj.str();
}

/**
 * Tests precision of answer up to 'precision' amount of
 * decimal points. In this case, precision would be 12
 * decimal points.
 *
 * @param answer what we are trying to confirm
 * @param match_to the number to confirm with
 */
bool test_precision(int precision, double answer, double match_to) {
    return get_precision(precision, answer) == get_precision(precision, match_to);
}

double evaluate(double a, double d, double n, double r) {
    double first = a*(1-pow(r, n))*(1-r);
    double second = d*(1-pow(r, n+1));
    double third = d*pow(r, n)*(n+1)*(1-r);
    double numerator = first-second+third;
    double denominator = pow(1-r, 2);

    return numerator / denominator;
}

bool is_intermediate_value(double a, double lower, double upper) {
    if (a == lower || a == upper) {
        return true;
    }

    if (a > upper) {
        return a <= lower;
    } else {
        return a >= lower;
    }
}

void pe::pe_235() {
    double a = 1, d = 1, n = 3000, x = (-1 * 100000000);

    double r_lower = INITIAL_INTERVAL * -1;
    double r_upper = INITIAL_INTERVAL;

    double r_middle = 0.0;
    double x_lower, x_middle, x_upper;

    // Binary search
    do {
        r_middle = r_lower + ((r_upper - r_lower) / 2);
        x_middle = evaluate(a, d, n, r_middle);
        x_lower = evaluate(a, d, n, r_lower);
        x_upper = evaluate(a, d, n, r_upper);

        if (is_intermediate_value(x, x_middle, x_upper)) {
            r_lower = r_middle;
        } else if (is_intermediate_value(x, x_lower, x_middle)) {
            r_upper = r_middle;
        } else {
            r_lower -= EXPANSION_INTERVAL;
            r_upper += EXPANSION_INTERVAL;
        }
    } while (!test_precision(12, x, x_middle));

    std::cout << get_precision(14, r_middle) << std::endl;
}
