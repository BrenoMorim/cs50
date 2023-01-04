#include <stdio.h>
#include <string.h>
#include <cs50.h>

// Functions prototypes
int is_valid(string s);
string get_user_input(void);
int get_checksum(string credit);

int main(void)
{
    string credit = get_user_input();

    // Validating the lenght of the credit card
    int n = strlen(credit);
    if (!(n == 16 || n == 13 || n == 15))
    {
        printf("INVALID\n");
        return 0;
    }

    int checksum = get_checksum(credit);

    // Selecting the 2 first digits to check which type it is
    int first2digits = (((int) credit[0] - '0') * 10) + (int)(credit[1] - '0');
    if (checksum % 10 != 0)
    {
        printf("INVALID\n");
    }
    // If it begins with 4 then it's a VISA card
    else if (credit[0] == '4')
    {
        printf("VISA\n");
    }
    // If it begins with 34 or 37 then it's from American Express
    else if (first2digits == 34 || first2digits == 37)
    {
        printf("AMEX\n");
    }
    // If it is between 51 and 55 it's a Mastercard
    else if (first2digits >= 51 && first2digits <= 55)
    {
        printf("MASTERCARD\n");
    }
    else
    {
        printf("INVALID\n");
    }
    return 0;
}

int get_checksum(string credit)
{
    int checksum = 0;
    int n = strlen(credit);
    for (int i = n - 1; i >= 0; i--)
    {
        // We double each digit starting from the second last digit and then skipping one until the first one
        if (i % 2 == (n - 2) % 2)
        {
            // If the twice has more than one digits then we just sum them up
            int tmp = 2 * ((int) credit[i] - '0');
            if (tmp >= 10)
            {
                checksum += (int)(tmp / 10) + tmp - 10;
            }
            else
            {
                checksum += tmp;
            }
        }
        // If the digit was skipped, the we just add it to the checksum
        else
        {
            checksum += ((int) credit[i] - '0');
        }
    }
    return checksum;
}

string get_user_input(void)
{
    string s;
    do
    {
        s = get_string("Number: ");
    }
    // Guarantee that the user will give a valid input
    while (!is_valid(s));
    return s;
}

int is_valid(string s)
{
    for (int i = 0, n = strlen(s); i < n; i++)
    {
        // Checks if the string contains only valid digits
        if (s[i] < '0' || s[i] > '9')
        {
            return 0;
        }
    }
    return 1;
}