import React from 'react';
import renderer from 'react-test-renderer';
import { MockTheme } from '@/tests/utils';
import Desktop from '@/components/desmos_profile/components/connections/components/desktop';

// ==================================
// global setup
// ==================================
let component: renderer.ReactTestRenderer;

// ==================================
// unit tests
// ==================================
describe('screen: DesmosProfile/Desktop', () => {
  const connection: ProfileConnectionType[] = [
    {
      network: '',
      identifier: '',
      creationTime: '',
    },
  ];
  beforeEach(() => {
    component = renderer.create(
      <MockTheme>
        <Desktop items={connection} />
      </MockTheme>
    );
  });

  it('it renders', () => {
    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
