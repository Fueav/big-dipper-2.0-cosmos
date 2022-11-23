import React from 'react';
import renderer from 'react-test-renderer';
import { MockTheme } from '@/tests/utils';
import MsgReportData from '@/models/msg/oracle/msg_report_data';
import ReportData from '@/components/msg/oracle/report_data';

// ==================================
// mocks
// ==================================
jest.mock('@/components/name', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="Name" {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/BlockUser', () => {
  it('matches snapshot', () => {
    const message: MsgReportData = {
      type: 'MsgBlockUser',
      validator: 'validator',
      requestId: 100,
      category: 'oracle',
      json: {},
    };
    const component = renderer.create(
      <MockTheme>
        <ReportData message={message} />
      </MockTheme>
    );
    const tree = component?.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
