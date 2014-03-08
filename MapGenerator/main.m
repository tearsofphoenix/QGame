//
//  main.m
//  MapGenerator
//
//  Created by Lei on 14-3-8.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <Foundation/Foundation.h>

#define Width 20
#define Height 30

static void pMap(const char map[Width][Height])
{
    for (NSInteger i = 0; i < Width; ++i)
    {
        for (NSInteger j = 0; j < Height; ++j)
        {
            printf("%c", map[i][j]);
        }
        
        printf("\n");
    }
}

static void initMap(char map[Width][Height])
{
    for (NSInteger i = 0; i < Width; ++i)
    {
        for (NSInteger j = 0; j < Height; ++j)
        {
            map[i][j] = '0';
        }
    }
}


static void PrintMap(NSInteger stepLength)
{
    char map[Width][Height];
    initMap(map);
    
    srand((unsigned int)time(NULL));
    
    int s = rand();
    int chosedSide = s % 4;
    
    for (NSInteger i = 0; i < Width; ++i)
    {
        map[i][0] = '1';
        map[i][Height - 1] = '1';
    }
    
    for (NSInteger j=0; j<Height; ++j)
    {
        map[0][j] = '1';
        map[Width - 1][j] = '1';
    }
    
    NSInteger endX = 0;
    NSInteger endY = 0;
    
    NSInteger px = endX;
    NSInteger py = endY;

    switch (chosedSide)
    {
        //---->
        case 0:
        {
            endX = 0;
            endY = s % Height;
            map[endX][endY] = '2';
            
            NSInteger step = rand() % Width;
            px = step;
            py = endY;
            if (px < Width - 1)
            {
                map[px + 1][py] = '1';
            }
            break;
        }
        //<-----
        case 1:
        {
            endX = Width - 1;
            endY = s % Height;
            map[endX][endY] = '2';
            
            NSInteger step = rand() % Width;
            px = Width - 1 - step;
            py = endY;
            if (px > 0)
            {
                map[px - 1][py] = '1';
            }
            break;
        }
        //  |
        // \|/
        case 2:
        {
            endX = s % Width;
            endY = 0;
            map[endX][endY] = '2';
            
            NSInteger step = rand() % Height;
            px = endX;
            py = step;
            
            if (py < Height - 1)
            {
                map[px][py + 1] = '1';
            }
            break;
        }
        //  /|\
        //   |
        case 3:
        {
            endX = s % Width;
            endY = Height - 1;
            map[endX][endY] = '2';
            
            NSInteger step = rand() % Height;
            px = endX;
            py = Height - 1 - step;

            if (py > 0)
            {
                map[px][py - 1] = '1';
            }
            break;
        }
        default:
            break;
    }
    
    
    while (stepLength > 0)
    {
        //current chosed side
        //
        switch (chosedSide)
        {
            //   /|\ 3
            //--->   0
            //   \|/ 2
            case 0:
            {
                s = rand();
                if (s % 2 == 0)
                {
                    chosedSide = 3;
                    NSInteger step = rand() % py;
                    
                }else
                {
                    chosedSide = 2;
                }
                break;
            }
            case 1:
            {
                endX = Width - 1;
                endY = s % Height;
                map[endX][endY] = '2';
                break;
            }
            case 2:
            {
                endX = s % Width;
                endY = 0;
                map[endX][endY] = '2';
                break;
            }
            case 3:
            {
                endX = s % Width;
                endY = Height - 1;
                map[endX][endY] = '2';
                break;
            }
            default:
                break;
        }
        
        --stepLength;
    }
    
    pMap(map);
    
    
}

int main(int argc, const char * argv[])
{

    @autoreleasepool
    {
        PrintMap(5);
    }
    return 0;
}

