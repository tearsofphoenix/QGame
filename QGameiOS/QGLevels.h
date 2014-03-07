//
//  QGLevel.h
//  QGame
//
//  Created by Mac003 on 14-3-6.
//  Copyright (c) 2014年 Mac003. All rights reserved.
//

#import <Foundation/Foundation.h>

@class QGScene;

@interface QGLevels : NSObject

- (id)initWithString: (NSString *)str;

- (void)buildWordForScene: (QGScene *)scene
                    level: (NSInteger)level;

@end
