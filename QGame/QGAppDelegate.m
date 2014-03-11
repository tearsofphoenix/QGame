//
//  QGAppDelegate.m
//  QGame
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGAppDelegate.h"
#import "QGViewController.h"

@interface QGAppDelegate ()
{
    UIWindow *_window;
}
@end

@implementation QGAppDelegate

static void convert(NSString *str)
{
    NSArray *map = [str componentsSeparatedByString: @"\n"];
    //NSLog(@"%@", map);
    
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

- (BOOL)          application: (UIApplication *)application
didFinishLaunchingWithOptions: (NSDictionary *)launchOptions
{
    NSString *str = @"000000000000000000000000\n000000000000000000000000\n111111111111211111111111\n100000000001010000000001\n100000000001010000000001\n100000000000000000000001\n100000000000000000000001\n100000000000000000000001\n100000000001000000000001\n100000000000010000000001\n100000000000000000000001\n100000000010000000000001\n111111111111111111111111\n000000000000000000000000\n000000000000000000000000";
    convert(str);
    
    _window = [[UIWindow alloc] initWithFrame: [[UIScreen mainScreen] bounds]];
    
    QGViewController *viewController = [[QGViewController alloc] init];
    [_window setRootViewController: viewController];
    
    [_window makeKeyAndVisible];
    
    return YES;
}

#if __IPAD_OS_VERSION_MAX_ALLOWED >= __IPAD_6_0

- (NSUInteger)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window
{
    
    return UIInterfaceOrientationMaskAll;
    
    
} 
#endif

@end
