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

- (BOOL)          application: (UIApplication *)application
didFinishLaunchingWithOptions: (NSDictionary *)launchOptions
{
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
