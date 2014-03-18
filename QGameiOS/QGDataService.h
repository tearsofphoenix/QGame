//
//  QGDataService.h
//  QGame
//
//  Created by Mac003 on 14-3-14.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface QGDataService : NSObject

+ (id)service;

- (NSInteger)levelCount;

- (NSDictionary *)levelWithIndex: (NSInteger)index;

@end
