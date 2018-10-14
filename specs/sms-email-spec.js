import {
  HANG_UP_OR_EXIT,
  SEND_AN_EMAIL,
  SEND_AN_SMS
} from '../constants/components';
import { BASIC, MESSAGING } from '../constants/modules';
import ConfigHelper from '../helpers/config-helper';

const pageName = 'Test';
const smsData = ConfigHelper.load('sms');
const emailData = ConfigHelper.load('email');
const {
  sms: SMS_OFFSET,
  email: EMAIL_OFFSET,
  exit: { one: EXIT_1_OFFSET, two: EXIT_2_OFFSET, three: EXIT_3_OFFSET }
} = ConfigHelper.load('offsets');

describe('Feature: QuickFuseApps - Sending SMS and Email', () => {
  before(() => {
    app.homePage.open();
  });

  it('should send an sms and if fails send an email for SMS failure', () => {
    app.homePage.goToCreateAppPage();
    app.createAppPage.introDialogBox.letsGetStarted();
    app.createAppPage.createNewPage(pageName);
    app.createAppPage.selectModule(MESSAGING);
    app.createAppPage.modules.messaging.dragAndDropComponent(
      SEND_AN_SMS,
      SMS_OFFSET
    );
    const startSouthNode = app.createAppPage.editScreen.start.southNode;
    const sendSmsNorthNode = app.createAppPage.editScreen.sendSms.northNode;

    app.createAppPage.editScreen.connectNodes(startSouthNode, sendSmsNorthNode);
    app.createAppPage.editScreen.sendSms.enterValues(smsData);
    app.createAppPage.modules.messaging.dragAndDropComponent(
      SEND_AN_EMAIL,
      EMAIL_OFFSET
    );
    const sendSmsEastNode = app.createAppPage.editScreen.sendSms.eastNode;
    const sendEmailNorthNode = app.createAppPage.editScreen.sendEmail.northNode;

    app.createAppPage.editScreen.connectNodes(
      sendSmsEastNode,
      sendEmailNorthNode
    );
    app.createAppPage.editScreen.sendEmail.enterValues(emailData);
    app.createAppPage.selectModule(BASIC);
    app.createAppPage.modules.basic.dragAndDropComponent(
      HANG_UP_OR_EXIT,
      EXIT_1_OFFSET
    );
    const sendSmsWestNode = app.createAppPage.editScreen.sendSms.westNode;
    const firstExitNorthNode = app.createAppPage.editScreen.exits(1).northNode;

    app.createAppPage.editScreen.connectNodes(
      sendSmsWestNode,
      firstExitNorthNode
    );
    app.createAppPage.modules.basic.dragAndDropComponent(
      HANG_UP_OR_EXIT,
      EXIT_2_OFFSET
    );
    const sendEmailWestNode = app.createAppPage.editScreen.sendEmail.westNode;
    const secondExitNorthNode = app.createAppPage.editScreen.exits(2).northNode;

    app.createAppPage.editScreen.connectNodes(
      sendEmailWestNode,
      secondExitNorthNode
    );
    app.createAppPage.modules.basic.dragAndDropComponent(
      HANG_UP_OR_EXIT,
      EXIT_3_OFFSET
    );
    const sendEmailEastNode = app.createAppPage.editScreen.sendEmail.eastNode;
    const thirdExitNorthNode = app.createAppPage.editScreen.exits(3).northNode;

    app.createAppPage.editScreen.connectNodes(
      sendEmailEastNode,
      thirdExitNorthNode
    );
  });
});
