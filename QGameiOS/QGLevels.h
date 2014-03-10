//
//  QGLevel.h
//  QGame
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <Foundation/Foundation.h>

#define QGTileWidth 16

@class QGScene;

@interface QGLevels : NSObject

- (id)initWithString: (NSString *)str;

- (NSDictionary *)levelInfoAtIndex: (NSInteger)index;

@end
