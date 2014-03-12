(function() {
    var levels;
    levels = window.levels = [
    {
        'player_coords': {
            'x': 2,
            'y': 10
        },
        'texts': [
        {
            'attrs': {
                'x': 0,
                'y': 2 * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'My life does not always make sense.'
        }, {
            'attrs': {
                'x': 0,
                'y': (MAP_H - 3) * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'I knew, when I slipped into the void, that it would be this way.'
        }
        ],
        'map': "00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n11111111111111111111111111111111111111111\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000011\n10000000000000000000000000000000000000002\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n11111111111111111111111111111111111111111\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000"
    }, 
    {
        'player_coords': {
            'x': 2,
            'y': 10
        },
        'texts': [
        {
            'attrs': {
                'x': 0,
                'y': 2 * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'There is a space between spaces where time folds in on itself.'
        }, {
            'attrs': {
                'x': 0,
                'y': (MAP_H - 3) * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'Where memory is just a memory.'
        }
        ],
        'map': "00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n11111111111111111111211111111111111111111\n10000000000000000001010000000000000000001\n10000000000000000001010000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000001000000000000000000001\n10000000000000000000010000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000010000000000000000000001\n11111111111111111111111111111111111111111\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000"
    },
    {
        'player_coords': {
            'x': 2,
            'y': 10
        },
        'texts': [
        {
            'attrs': {
                'x': 0,
                'y': 2 * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'How long have I been wandering?'
        }
        ],
        'map': "00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n11111111111111111111211111111111111111111\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000011\n10000000000000000001000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n11111111111111111111111111111111111111111\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000"
    }, 
    {
        'player_coords': {
            'x': 21,
            'y': 11
        },
        'texts': [
        {
            'attrs': {
                'x': TILE_W,
                'y': 9 * TILE_H,
                'h': 40,
                'w': TILE_W * 11
            },
            'text': 'Sometimes the way\nis obscured.'
        }, {
            'attrs': {
                'x': (MAP_W - 11) * TILE_W,
                'y': 9 * TILE_H,
                'h': 40,
                'w': TILE_W * 11
            },
            'text': 'But there is\nalways a path.'
        }
        ],
        'map': "00555005555511555111121115551000055555550\n00055555500010000100000001555000555555000\n00000550000010000000100000055555555000000\n00000000000010001000111000005555550000000\n00000000000010000000000000001000000000000\n00000000000010000000000000001000000000000\n00000000000010000000000000001000000000000\n00000000000010000000000000001000000000000\n00000000000010000000000000001000000000000\n00000000000010000000000000001000000000000\n00000000000010000000101000001000000000000\n00000000000010000000101000001000000000000\n00000000000011100000111000001000000000000\n00000000000010000000000000001000000000000\n00000000000010000000000000001000000000000\n00000000000010000000000000001000000000000\n00000000000010000000000000001000000000000\n00000000000010000000000000101000000000000\n00000000000010000010000000551000000000000\n00000000000010000000000055555550055500000\n00000000000011111111115555115555555555500"
    }, 
    {
        'player_coords': {
            'x': 20,
            'y': 19
        },
        'texts': [
        {
            'attrs': {
                'x': TILE_W,
                'y': 9 * TILE_H,
                'h': 20,
                'w': TILE_W * 13
            },
            'text': 'They told me not to go.'
        }, {
            'attrs': {
                'x': TILE_W * 28,
                'y': 9 * TILE_H,
                'h': 20,
                'w': TILE_W * 13
            },
            'text': 'But how could I leave him behind?'
        }
        ],
        'map': "00000000000000011112111111100000000000000\n00000000000000015510000001100000000000000\n00000000000000010010010005100000000000000\n00000000000000010000000001100000000000000\n00000000000000010000100000100000000000000\n00000000000000010000000000100000000000000\n00000000000000010000010000100000000000000\n00000000000000010100000000100000000000000\n00000000000000011000000000100000000000000\n00000000000000010000000000100000000000000\n00000000000000010000000100100000000000000\n00000000000000010000000010100000000000000\n00000000000000010000000001100000000000000\n00000000000000010000000000100000000000000\n00000000000000010000000000100000000000000\n00000000000000010000000000100000000000000\n00000000000000010000000000100000000000000\n00000000000000010000000000100000000000000\n00000000000000010000000000100000000000000\n00000000000000010000000000100000000000000\n00000000000000011111111111100000000000000"
    }, 
    {
        'player_coords': {
            'x': 20,
            'y': 19
        },
        'texts': [
        {
            'attrs': {
                'x': TILE_W,
                'y': 5 * TILE_H,
                'h': 40,
                'w': TILE_W * 13
            },
            'text': 'He is my prince. I will find him.\nI will bring him home.'
        }, {
            'attrs': {
                'x': TILE_W * 28,
                'y': 8 * TILE_H,
                'h': 40,
                'w': TILE_W * 13
            },
            'text': 'No matter how many rivers\nI have to cross.'
        }
        ],
        'map': "00000000055550000012100000000000000000000\n00000000000055551110111111110000000000000\n00000000000000010000005155555550000000000\n00000000000000010000001000010555555000000\n00000000000000010100000010010000005555555\n00000000000000010000000001010000000000000\n00000000000000010100000000010000000000000\n00000000000000010000000100010000000000000\n00000000000000010000000000010000000000000\n00000000000000010000000001010000000000000\n00000000000000010010000000010000000000000\n00000000000000010000000001110000000000000\n11111111111111111000000000010000000000000\n55550000000000000000000001011111111111111\n55555555555550050555555555055555500555555\n00555555555555550555555555055555555555555\n00000000000555550000000010000005555550000\n11000000000000000001000100000000000000000\n11111111111111110011000000000000000000000\n00000000000000010000000000011111111111111\n00000000000000011111111111110000000000000"
    }, 
    {
        'player_coords': {
            'x': 20,
            'y': 19
        },
        'texts': [
        {
            'attrs': {
                'x': TILE_W,
                'y': 9 * TILE_H,
                'h': 40,
                'w': TILE_W * 10
            },
            'text': 'It isn&#8217;t what I expected. It&#8217;s strangely beautiful here, but nothing moves.'
        }, {
            'attrs': {
                'x': (MAP_W - 11) * TILE_W,
                'y': 10 * TILE_H,
                'h': 40,
                'w': TILE_W * 11
            },
            'text': 'There is not even a wind.'
        }
        ],
        'map': "00000000000015115151155555151000000000000\n00000000000015000100000000002000000000000\n00000000000015011111011101051000000000000\n00000000000015010001000001051000000000000\n00000000000015010101010101051000000000000\n00000000000015010001011100051000000000000\n00000000000015010101000001051000000000000\n00000000000011000000000000051000000000000\n00000000000015010101010111051000000000000\n00000000000015000000010000051000000000000\n00000000000015010101110101051000000000000\n00000000000015010000010000051000000000000\n00000000000015011101010111551000000000000\n00000000000015000000000000051000000000000\n00000000000015011101010101051000000000000\n00000000000011000000000001051000000000000\n00000000000015010101010101051000000000000\n00000000000015010000000000011000000000000\n00000000000015010111010000051000000000000\n00000000000015000001010000151000000000000\n00000000000015551555555555551000000000000"
    }, 
    {
        'player_coords': {
            'x': 28,
            'y': 18
        },
        'map': "00000000005111121111111111111155555500000\n00000000005100000000000000055555550000000\n00000000005100000001000000555555500000000\n00000000055100001100000005555555000000000\n00000000055100001000015555555551000000000\n00000000055100000000155555500051000000000\n00000000055110000005155555100051000000000\n00000000055105501000015550000051000000000\n00000000055105100001055000000051000000000\n00000000005155555515050000000051000000000\n00000000005555555555001000001151000000000\n00000000005555005510000001000551000000000\n00000000005555000000001000000551000000000\n00000000055550000000000000000551000000000\n00000000055550000001000000000551000000000\n00000000555555500001110000000051000000000\n00000005555555555100000000100051000000000\n00000055555500005551000000000051000000000\n00000055555100000005551000000051000000000\n00000555555100000000005555500051000000000\n00555555505111111111111111155551000000000"
    }, 
    {
        'player_coords': {
            'x': 20,
            'y': 18
        },
        'texts': [
        {
            'attrs': {
                'x': TILE_W,
                'y': 18.5 * TILE_H,
                'h': 20,
                'w': TILE_W * 18
            },
            'text': 'There&#8217;s so much water.'
        }, {
            'attrs': {
                'x': (MAP_W - 18) * TILE_W,
                'y': 18.5 * TILE_H,
                'h': 20,
                'w': TILE_W * 18
            },
            'text': 'I don&#8217;t know what I expected.'
        }
        ],
        'map': "11110011111111111111211111111111111111100\n10111111000000000000000001000000000001111\n10000000000000000100000000000000000000001\n50000000000000000000000000001000000000001\n55550000000000000000000010000000000000001\n55555555555555555055055550550555555500001\n55555555000000000001000000000000005555551\n55555000000010000000000001000000000555555\n55555000000000000010000000000100000555555\n55555000000000000000000000000000010555555\n55555000000000000000111000000000000555555\n55555000000000001111000110000000000555555\n55555000000000110000000000100000005555555\n55555500000000000010000000000000005555555\n10555500000100000000000000000000555555555\n10005555555555551505555555055555555555555\n10000000000000055501110000000000000055555\n10000001000000000000000000010000000000555\n10000000000000000001010000000000000000001\n10000000000000000001115550000000000000001\n15555555155555555555555555555555555555551"
    }, 
    {
        'player_coords': {
            'x': 2,
            'y': 10
        },
        'texts': [
        {
            'attrs': {
                'x': 0,
                'y': 2 * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'Fire,'
        }, {
            'attrs': {
                'x': 0,
                'y': (MAP_H - 3) * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'I guess.'
        }
        ],
        'map': "00000000000000055000000000005500000000000\n00000000000000055000000000055500000000000\n00000000000000055000000000555000000000000\n00000000000011055000000005500000000110000\n00000000000010000000000000000000000010000\n11111111111110115511111551101111111011111\n15555555555550555500005500000010000001001\n15000000000000005510000000000000000001001\n15000010000000000555050000000100000000001\n15000000000000000000000000000000000000011\n15000000010000000000000000000000000000002\n15000000000001000551000000000000000001001\n15000000000000005550000000000000000010001\n15000100000000055500100000000000000000001\n15000100000000550000000000000000000000011\n11111111111111551111111111111111111111111\n00000000000055500000000000000000000000000\n00000000005550000000000000000000000000000\n00000000005500000000000000000000000000000\n00000000055500000000000000000000000000000\n00000000555000000000000000000000000000000"
    },
    {
        'player_coords': {
            'x': 20,
            'y': 11
        },
        'texts': [
        {
            'attrs': {
                'x': 0,
                'y': 2 * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'Hmm?'
        }
        ],
        'map': "00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n11111111111111111111111111111111111111111\n51000000000000000000000000000000000000001\n51000000000000000000000000000000000000005\n50000000000000000000001000000000000000005\n50000000000000000000003000000000000000001\n10011111111111111111111111111111111111101\n50000000000000000001000000000000000000005\n50000000000000000000010000000000000000005\n50000000000000000010000000000000000000005\n10000000000000000000000000000000000000011\n11111111111111111111411111111111111111111\n00000000000000000000200000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000"
    },
    {
        'player_coords': {
            'x': 20,
            'y': 10
        },
        'texts': [
        {
            'attrs': {
                'x': 0,
                'y': 2.5 * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'After he left, I saw windows everywhere.'
        }, {
            'attrs': {
                'x': 0,
                'y': 17 * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'That fear. His gift to me.'
        }
        ],
        'map': "11111111111111111111111111111111111111111\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000010000000000000000000000000000000001\n11110010011111111111111111111111111001111\n10010000000000000000000000000000001000001\n10000001000000000000000000000000000000001\n10000000000000000000000000000000000000031\n10000100000000000000000000000000000000001\n10000100000000000000000000000000000100001\n15555100551555555555555555555555541155551\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000001000000000000000000001\n11111111111111111111411111111111111111111\n00000000000000000000200000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000"
    }, 
    {
        'player_coords': {
            'x': 20,
            'y': 18
        },
        'map': "00000000001111111111111111111110000055555\n00000000001000000000000000000010000555500\n00000000001000000000000000000010055550000\n00000000001000030100000000000015555000000\n00000000001100000000000000000555500000000\n11111111111000000000000000055511111111111\n10000000000001000000000055555000000000001\n10000000000010000000000555000011000000001\n10000000000000000000055500000000000010001\n10000000000000000001150001000000000000011\n10000000000000000551400000000000100000002\n10000100000000000000000000000000000000101\n10000000000055550000000000000000000000001\n10000000005550000000000000000000000000001\n10000000055500000000000000000000000001001\n11111111555100000000000000000011111111111\n00000005551000000000010000000010000000000\n00000555501000000000000000000010000000000\n00005550001000000000010000000010000000000\n00555500001000000000010000000010000000000\n55555000001111111111111111111110000000000"
    }, 
    {
        'player_coords': {
            'x': 20,
            'y': 10
        },
        'texts': [
        {
            'attrs': {
                'x': (MAP_W - 11) * TILE_W,
                'y': 10 * TILE_H,
                'w': 10 * TILE_W,
                'h': 20
            },
            'text': "Is it for me??"
        }
        ],
        'messages': [
        {
            'attrs': {
                'x': 26 * TILE_W,
                'y': 10 * TILE_H
            },
            'text': "Is anybody out there?"
        }
        ],
        'map': "00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000111111111111111111100000000000\n00000000000100000010000000100100000000000\n00000000000100000000000000100100000000000\n00000000000100000000000000000100000000000\n00000000000100000000000000000100000000000\n00000000000100000000000000000100000000000\n00000000000100000000000000000100000000000\n00000000000100000000100000000100000000000\n00000000000200000004000000043100000000000\n00000000000100000000100000001100000000000\n00000000000100000000000000000100000000000\n00000000000100000000000000000100000000000\n00000000000100000000000000000100000000000\n00000000000100000000000000000100000000000\n00000000000100000000000000000100000000000\n00000000000100000000000000100100000000000\n00000000000111111111111111111100000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000"
    }, {
        'player_coords': {
            'x': 20,
            'y': 11
        },
        'texts': [
        {
            'attrs': {
                'x': 0,
                'y': 2.5 * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'Every window was another opportunity to lose something.'
        }, {
            'attrs': {
                'x': 0,
                'y': 17 * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'Why did he leave?'
        }
        ],
        'map': "00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n11111111111111111111111111111111111111111\n51000000000000000000000000000000000000011\n51000000000000000000000000000000000000005\n50000000000000000000001000000000000000005\n50000000000000000000003000000000000000001\n10011111111111111111111111111111111111101\n50000000000000000001000000000000000000005\n50000000000000000000000000000010000000005\n50100000000000000000000000000000000000005\n10000000000000000000000000000000000000001\n11111111111111111111411111111111111111111\n00000000000000000000200000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000"
    }, {
        'player_coords': {
            'x': 23,
            'y': 8
        },
        'texts': [
        {
            'attrs': {
                'x': 0,
                'y': 2.5 * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'I tried to forget the question. I gave it to the sky. I gave it to the trees.'
        }, {
            'attrs': {
                'x': 0,
                'y': 17 * TILE_H,
                'h': 20,
                'w': TILE_W * MAP_W
            },
            'text': 'But they gave it back.'
        }
        ],
        'messages': [
        {
            'attrs': {
                'x': 39 * TILE_W,
                'y': 3 * TILE_H
            },
            'text': "It is very strange here. I am not sure I like it."
        }, {
            'attrs': {
                'x': 35 * TILE_W,
                'y': 10 * TILE_H
            },
            'text': "Yesterday I dipped my feet in the river. I am trying very hard to remember something but I don&#8217;t know what it is. How long have I been here?"
        }
        ],
        'map': "11111111111111111111111111111111111111111\n10000100000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000000000000000000001000001\n10000000000000000000000000000000001000011\n11111011111111111111111111111111111011111\n50001000000000000001000100000000000000001\n50001000000000000000000000000000000000001\n50000000000000000004300000000000000000001\n50000000000000000000000000000000000000001\n50000000000000000000010000000000000000001\n55555555555555555555455555555555555155551\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n10000000000000000000000000000000000000001\n11111111111111111111411111111111111111111\n00000000000000000000200000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000\n00000000000000000000000000000000000000000"
    }
    ];
}).call(this);

