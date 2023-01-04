#include <stdio.h>
#include <math.h>
#include <cs50.h>

int main(void)
{
    // Getting the initial population
    int initial;
    do
    {
        initial = get_int("Start size: ");
    }
    // It must be at least 9
    while (initial < 9);

    // Getting the final population
    int final;
    do
    {
        final = get_int("End size: ");
    }
    // It must be greater or equal than the initial population
    while (final < initial);

    int current_population = initial;
    int years = 0;

    // Calculating how many years it will take to reach the final population
    while (current_population < final)
    {
        // The amount of llamas that were born
        int born = round(current_population / 3);

        // The amount of llamas that died
        int dead = round(current_population / 4);

        // Updating the current population and the years that have passed
        current_population += (born - dead);
        years++;
    }

    // Printing the result
    printf("Years: %d\n", years);
}