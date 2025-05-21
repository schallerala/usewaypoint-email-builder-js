/**
 * @jest-environment node
 */

import renderToStaticMarkup from './renderToStaticMarkup';

describe('renderToStaticMarkup', () => {
  it('renders into a string', () => {
    const result = renderToStaticMarkup(
      {
        root: {
          type: 'Container',
          data: {
            props: {
              childrenIds: [],
            },
          },
        },
      },
      { rootBlockId: 'root' }
    );
    expect(result).toEqual('<!DOCTYPE html><html><head></head><body><div></div></body></html>');
  });
});
