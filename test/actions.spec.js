import { expect } from 'chai';
import { push, replace, go, goBack, goForward, locationChange } from '../src/actions';

describe('action creators', () => {
  const testUrl = '/nested/path?with=query#and-hash';

  it('push', () => {
    expect(push(testUrl)).to.eql({
      type: 'ROUTER/PUSH',
      payload: '/nested/path?with=query#and-hash',
    });
  });

  it('replace', () => {
    expect(replace(testUrl)).to.eql({
      type: 'ROUTER/REPLACE',
      payload: '/nested/path?with=query#and-hash',
    });
  });

  it('go', () => {
    expect(go(-1)).to.eql({
      type: 'ROUTER/GO',
      payload: -1,
    });

    expect(go(0)).to.eql({
      type: 'ROUTER/GO',
      payload: 0,
    });

    expect(go(1)).to.eql({
      type: 'ROUTER/GO',
      payload: 1,
    });
  });

  it('goBack', () => {
    expect(goBack()).to.eql({
      type: 'ROUTER/GO_BACK',
    });
  });

  it('goForward', () => {
    expect(goForward()).to.eql({
      type: 'ROUTER/GO_FORWARD',
    });
  });

  it('locationChange', () => {
    const location = {
      pathname: '/nested/path',
      search: '?with=query',
      hash: '#and-hash',
    };

    expect(locationChange(location)).to.eql({
      type: 'ROUTER/LOCATION_CHANGE',
      payload: {
        pathname: '/nested/path',
        search: '?with=query',
        queries: {
          with: 'query',
        },
        hash: '#and-hash',
      },
    });
  });
});
