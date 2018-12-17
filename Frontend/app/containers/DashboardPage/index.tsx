/**
 *
 * DashboardPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import image from 'images/kiwi.jpg';
import comImage from 'images/communityPlaceHolder.jpg';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import Dashboard from 'components/Dashboard';

const communities = [{
  name: 'Eth Global',
  tokens: 128,
  logo: comImage,
  id: '1',
  onClick: (id) => console.log(id)
}, {
  name: 'The fisherman',
  tokens: 6,
  logo: comImage,
  id: '2',
  onClick: (id) => console.log(id)
}, {
  name: 'Fire truckers',
  tokens: 3,
  logo: comImage,
  id: '3',
  onClick: (id) => console.log(id)
}, {
  name: 'Artists',
  tokens: 4,
  logo: comImage,
  id: '4',
  onClick: (id) => console.log(id)
}, {
  name: 'Coders',
  tokens: 239,
  logo: comImage,
  id: '5',
  onClick: (id) => console.log(id)
}, {
  name: 'Charities Global',
  tokens: 503,
  logo: comImage,
  id: '6',
  onClick: (id) => console.log(id)
}, {
  name: 'Woodworkers',
  tokens: 3,
  logo: comImage,
  id: '7',
  onClick: (id) => console.log(id)
}, {
  name: 'Event creators',
  tokens: 40,
  logo: comImage,
  id: '8',
  onClick: (id) => console.log(id)
}];

const events = [{
  eventName: 'Eth Cape Town',
  eventID: '1',
  image: image,
  comLogo: comImage,
  onClick: (eventID) => console.log(eventID)
}, {
  eventName: 'Artist workshop 3',
  eventID: '2',
  image: image,
  comLogo: comImage,
  onClick: (eventID) => console.log(eventID)
}, {
  eventName: 'Eth Berlin',
  eventID: '3',
  image: image,
  comLogo: comImage,
  onClick: (eventID) => console.log(eventID)
}, {
  eventName: 'Truck maintenance beginner',
  eventID: '4',
  image: image,
  comLogo: comImage,
  onClick: (eventID) => console.log(eventID)
}];

function DashboardPage() {

  return (
    // @ts-ignore
    <Dashboard image='' name='test' ensName='test ens' tokenBalance={1} communities={communities} events={events} />
    
  );
}

const mapStateToProps = createStructuredSelector({
  dashboardpage: makeSelectDashboardPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'dashboardpage', reducer });
const withSaga = injectSaga({ key: 'dashboardpage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashboardPage);
