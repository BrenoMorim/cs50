#include <cs50.h>
#include <stdio.h>
#include <math.h>

float get_user_input(void);
int get_number_of_coins(float change);

int main(void)
{
    float change = get_user_input();
    int coins = get_number_of_coins(change);
    printf("%d\n", coins);
}

int get_number_of_coins(float change)
{
    // Turns it into an integer as cents to avoid imprecision
    int cents = round(change * 100);
    int coins = 0;

    // Calculates the amount of coins necessary
    for (int i = 0; i < 4; i++)
    {
        // Goes truth each type of coin to subtract the change until it becomes 0
        int types_of_coins[4] = {25, 10, 5, 1};
        while (cents >= types_of_coins[i])
        {
            cents -= types_of_coins[i];
            coins++;
        }
    }
    return coins;
}

float get_user_input(void)
{
    // Gets a float representing the change
    float change;

    // Keeps asking the height until it gets a valid value
    do
    {
        // Prompts the change
        change = get_float("Change: ");
    }
    while (change <= 0);
    return change;
}