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


static void convert(NSString *str)
{
    NSArray *map = [str componentsSeparatedByString: @"\n"];
    NSLog(@"%@", map);
    //return;
    
    NSInteger width = [map[0] length];
    NSInteger height = [map count];
    
    NSMutableArray *newMap = [NSMutableArray array];
    
    for(NSInteger i = 0;i < width; ++i)
    {
        NSMutableString *str = [NSMutableString stringWithString: @""];
        for (NSInteger j = 0; j < height; ++j)
        {
            const char *cstr = [map[j] cStringUsingEncoding: NSUTF8StringEncoding];
            [str appendFormat: @"%c",  cstr[i]];
        }
        
        [newMap addObject: str];
    }
    
    NSLog(@"%@", newMap);
    NSLog(@"%@", [newMap componentsJoinedByString: @"\\n"]);
}

int main(int argc, const char * argv[])
{

    @autoreleasepool
    {
        //PrintMap(5);
        NSString *str = @"11111111111111111111111111111111111111111\n10000100000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000000000000000000001000001\n10000000000000000000000000000000001000011\n11111011111111111111111111111111111011111\n50001000000000000001000100000000000000001\n50001000000000000000000000000000000000001\n50000000000000000004300000000000000000001\n50000000000000000000000000000000000000001\n50000000000000000000010000000000000000001\n55555555555555555555455555555555555155551\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n11111111111111111111411111111111111111111\n00000000000000000000200000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000";
        convert(str);
        
    }
    return 0;
}

