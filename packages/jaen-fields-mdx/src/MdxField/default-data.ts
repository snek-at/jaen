import {MdastRoot} from './components/types.js'

export const defaultData = {
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [
        {
          type: 'text',
          value: 'Hello, world!',
          position: {
            start: {
              line: 1,
              column: 3,
              offset: 2
            },
            end: {
              line: 1,
              column: 16,
              offset: 15
            }
          }
        }
      ],
      position: {
        start: {
          line: 1,
          column: 1,
          offset: 0
        },
        end: {
          line: 1,
          column: 16,
          offset: 15
        }
      }
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: '// This is a ',
          position: {
            start: {
              line: 3,
              column: 1,
              offset: 17
            },
            end: {
              line: 3,
              column: 14,
              offset: 30
            }
          }
        },
        {
          type: 'strong',
          children: [
            {
              type: 'text',
              value: 'jaen',
              position: {
                start: {
                  line: 3,
                  column: 16,
                  offset: 32
                },
                end: {
                  line: 3,
                  column: 20,
                  offset: 36
                }
              }
            }
          ],
          position: {
            start: {
              line: 3,
              column: 14,
              offset: 30
            },
            end: {
              line: 3,
              column: 22,
              offset: 38
            }
          }
        },
        {
          type: 'text',
          value: ' MDX field.',
          position: {
            start: {
              line: 3,
              column: 22,
              offset: 38
            },
            end: {
              line: 3,
              column: 33,
              offset: 49
            }
          }
        }
      ],
      position: {
        start: {
          line: 3,
          column: 1,
          offset: 17
        },
        end: {
          line: 3,
          column: 33,
          offset: 49
        }
      }
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: '// ## Usage',
          position: {
            start: {
              line: 5,
              column: 1,
              offset: 51
            },
            end: {
              line: 5,
              column: 12,
              offset: 62
            }
          }
        }
      ],
      position: {
        start: {
          line: 5,
          column: 1,
          offset: 51
        },
        end: {
          line: 5,
          column: 12,
          offset: 62
        }
      }
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: '// You can use this field to write markdown content.\n//',
          position: {
            start: {
              line: 7,
              column: 1,
              offset: 64
            },
            end: {
              line: 8,
              column: 3,
              offset: 119
            }
          }
        }
      ],
      position: {
        start: {
          line: 7,
          column: 1,
          offset: 64
        },
        end: {
          line: 8,
          column: 4,
          offset: 120
        }
      }
    }
  ],
  position: {
    start: {
      line: 1,
      column: 1,
      offset: 0
    },
    end: {
      line: 15,
      column: 8,
      offset: 228
    }
  }
} as MdastRoot
