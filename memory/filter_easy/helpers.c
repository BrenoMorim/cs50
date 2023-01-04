#include "helpers.h"
#include <math.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // Getting the average color and updating the values
            int mean = round((image[i][j].rgbtBlue + image[i][j].rgbtGreen + image[i][j].rgbtRed) / 3.0);
            image[i][j].rgbtBlue = mean;
            image[i][j].rgbtRed = mean;
            image[i][j].rgbtGreen = mean;
        }
    }
    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // Applying the sepia algorithm
            int sepiaRed = round(.393 * image[i][j].rgbtRed + .769 * image[i][j].rgbtGreen + .189 * image[i][j].rgbtBlue);
            int sepiaGreen = round(.349 * image[i][j].rgbtRed + .686 * image[i][j].rgbtGreen + .168 * image[i][j].rgbtBlue);
            int sepiaBlue = round(.272 * image[i][j].rgbtRed + .534 * image[i][j].rgbtGreen + .131 * image[i][j].rgbtBlue);

            // Updating the values
            image[i][j].rgbtRed = (sepiaRed > 255) ? 255 : sepiaRed;
            image[i][j].rgbtGreen = (sepiaGreen > 255) ? 255 : sepiaGreen;
            image[i][j].rgbtBlue = (sepiaBlue > 255) ? 255 : sepiaBlue;
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    int half = width / 2;
    for (int i = 0; i < half; i++)
    {
        for (int j = 0; j < height; j++)
        {
            // Reverse the columns
            RGBTRIPLE tmp = image[j][width - i - 1];
            image[j][width - i - 1] = image[j][i];
            image[j][i] = tmp;
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    // Creating a temporary image to be blurred
    RGBTRIPLE temp[height][width];
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            temp[i][j] = image[i][j];
        }
    }

    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            int sum_blue;
            int sum_green;
            int sum_red;
            float counter;
            sum_blue = sum_green = sum_red = counter = 0;

             // Iterating through each column
            for (int c = -1; c < 2; c++)
            {
                // As well as each row
                for (int r = -1; r < 2; r++)
                {
                    // If the column doesn't exist
                    if (i + c < 0 || i + c > (height - 1))
                    {
                        continue;
                    }
                    // If the row doesn't exist
                    if (j + r  < 0 || j + r > (width - 1))
                    {
                        continue;
                    }
                    // Summing up the values
                    sum_blue += temp[i + c][j + r].rgbtBlue;
                    sum_red += temp[i + c][j + r].rgbtRed;
                    sum_green += temp[i + c][j + r].rgbtGreen;
                    counter++;
                }
            }

            // After calculating all the averages we can just apply the filter to the image image
            image[i][j].rgbtRed = round(sum_red / counter);
            image[i][j].rgbtGreen = round(sum_green / counter);
            image[i][j].rgbtBlue = round(sum_blue / counter);
        }
    }
    return;
}
