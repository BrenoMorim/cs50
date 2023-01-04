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


// Detect edges
void edges(int height, int width, RGBTRIPLE image[height][width])
{
    // Copying the image to avoid including already filtered pixel in the calculations
    RGBTRIPLE tmp[height][width];

    // Gx and Gy matrix
    int Gx[3][3] = {{-1, 0, 1}, {-2, 0, 2}, {-1, 0, 1}};
    int Gy[3][3] = {{-1, -2, -1}, {0, 0, 0}, {1, 2, 1}};

    // Filling the copy with the pixels of the image
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            tmp[i][j] = image[i][j];
        }
    }

    // Iterating through the rows
    for (int i = 0; i < height; i++)
    {
        // Iterating through the columns
        for (int j = 0; j < width; j++)
        {
            // Initializing Gx and Gy values for each color
            double GxR = 0, GxG = 0, GxB = 0;
            double GyR = 0, GyG = 0, GyB = 0;

            // Selecting a 3x3 grid of pixels each iteration
            for (int row = -1; row < 2; row++)
            {
                for (int col = -1; col < 2; col++)
                {
                    // Assures it's not out of range
                    if (row + i < 0 || row + i > height - 1 || col + j < 0 || col + j > width - 1)
                    {
                        continue;
                    }

                    // Applying the convolutional filter
                    GxR += tmp[i + row][j + col].rgbtRed * Gx[row + 1][col + 1];
                    GxG += tmp[i + row][j + col].rgbtGreen * Gx[row + 1][col + 1];
                    GxB += tmp[i + row][j + col].rgbtBlue * Gx[row + 1][col + 1];

                    GyR += tmp[i + row][j + col].rgbtRed * Gy[row + 1][col + 1];
                    GyG += tmp[i + row][j + col].rgbtGreen * Gy[row + 1][col + 1];
                    GyB += tmp[i + row][j + col].rgbtBlue * Gy[row + 1][col + 1];
                }
            }

            // Calculating the value to each color
            double filtered_red = sqrt(((GxR * GxR) + (GyR * GyR)));
            double filtered_green = sqrt(((GxG * GxG) + (GyG * GyG)));
            double filtered_blue = sqrt(((GxB * GxB) + (GyB * GyB)));

            // Making sure it doesn't go above 255
            if (filtered_red > 255)
            {
                filtered_red = 255;
            }
            if (filtered_green > 255)
            {
                filtered_green = 255;
            }
            if (filtered_blue > 255)
            {
                filtered_blue = 255;
            }

            // Updating the image
            image[i][j].rgbtRed = (int) round(filtered_red);
            image[i][j].rgbtGreen = (int) round(filtered_green);
            image[i][j].rgbtBlue = (int) round(filtered_blue);
        }
    }

    return;
}