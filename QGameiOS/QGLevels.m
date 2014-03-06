//
//  QGLevel.m
//  QGame
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import "QGLevels.h"

@interface QGLevels ()
{
    NSArray *_info;
}
@end

@implementation QGLevels

- (id)initWithString: (NSString *)str
{
    if ((self = [super init]))
    {
        NSError *error = nil;
        
        _info = [NSJSONSerialization JSONObjectWithData: [str dataUsingEncoding: NSUTF8StringEncoding]
                                                options: 0
                                                  error: &error];
        if (error)
        {
            NSLog(@"%@", error);
        }
    }
    
    return self;
}

@end
