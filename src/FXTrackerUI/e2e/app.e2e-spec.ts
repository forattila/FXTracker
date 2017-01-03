import { FXTrackerUIPage } from './app.po';

describe('fxtracker-ui App', function() {
  let page: FXTrackerUIPage;

  beforeEach(() => {
    page = new FXTrackerUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
