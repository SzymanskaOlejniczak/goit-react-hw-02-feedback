import { Section } from './Section/Section';
import {FeedBackOptions} from './FeedBackOptions/FeedBackOptions';
import {Statistics} from './Statistics/Statistics';
import {Notification} from './Notification/Notification';
import { Component } from 'react';

export class App extends Component {
  state = { 
    good: 0,
    neutral: 0, 
    bad: 0 
  };

  handleLeaveFeedback = option => {
        this.setState(prevState => ({
      [option]: prevState[option] + 1,
          }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = this.state;
    const total = good + neutral + bad;
    return Math.round((good * 100) / total);
  };

  render() {
    const total = this.countTotalFeedback();
    const positiveFeedback = this.countPositiveFeedbackPercentage();
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);

    return (
      <>
        <Section title="Please leave feedback">
          <FeedBackOptions
            options={options} 
            onLeaveFeedback={this.handleLeaveFeedback} 
            />
        </Section>

        {total > 0 ? (
          <Section title="Statistics">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positiveFeedback}
            />
          </Section>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </>
    );
  }
}