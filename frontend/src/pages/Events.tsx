import {
  Horizontal,
  Timeslot,
  Vertical,
  types,
  spacing,
  width,
  Wrapper,
  GlobalStyles,
  WrapperProps,
} from '@kokitotsos/react-components';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import 'normalize.css';
import DateText from '@/styles/DateText';

export declare class StyledWrapper extends React.PureComponent<WrapperProps> {
  render(): React.JSX.Element;
}
export const Events = () => {
  const placeholderEvents: Events = {
    events: [
      {
        id: 1,
        user_id: '1',
        review_id: 1,
        winner: true,
        type: types.TimeslotType.Presentation,
        presenter: [{ id: '1', name: 'Magnus' }],
        location: { coordinates: [57.7092833, 11.9889706] },
        title: 'Tal till nationen',
        details: 'Viktigt',
        start: new Date('2024-02-05T11:00:00'),
        end: new Date('2024-02-05T12:00:00'),
      },
      {
        id: 2,
        user_id: '2',
        review_id: 2,
        winner: true,
        type: types.TimeslotType.Presentation,
        presenter: [{ id: '3', name: 'Alireza' }],
        location: { coordinates: [57.7092833, 11.9889706] },
        title: 'ER-diagram is the shit',
        details: 'PostgreSQL rules them all!',
        start: new Date('2024-02-07T13:00:00'),
        end: new Date('2024-02-07T14:00:00'),
      },
      {
        id: 3,
        user_id: '2',
        review_id: 2,
        winner: true,
        type: types.TimeslotType.Presentation,
        presenter: [{ id: '3', name: 'Alireza' }],
        location: { coordinates: [57.7092833, 11.9889706] },
        title: 'ER-diagram is the shit',
        details: 'PostgreSQL rules them all!',
        start: new Date('2024-02-05T09:00:00'),
        end: new Date('2024-02-05T10:00:00'),
      },
    ],
  };
  const [events, setEvents] = useState(placeholderEvents);

  const separateEventsByDate = (events: Events): { [key: string]: Event[] } => {
    const separatedEvents: { [key: string]: Event[] } = {};
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
    events.events.forEach((event) => {
      let date = event.start.toLocaleDateString('sv-SE', options);
      date = date.charAt(0).toUpperCase() + date.slice(1).toLowerCase();

      if (!separatedEvents[date]) {
        separatedEvents[date] = [];
      }

      separatedEvents[date].push(event);
    });

    Object.keys(separatedEvents).forEach((date) => {
      separatedEvents[date].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
    });

    return separatedEvents;
  };

  const separatedEvents = separateEventsByDate(events);

  type Event = {
    id: number;
    user_id: string;
    review_id: number;
    winner: boolean;
    type: types.TimeslotType;
    presenter: types.Person[];
    location: { coordinates: number[] };
    title: string;
    details: string;
    start: Date;
    end: Date;
  };

  type Events = {
    events: Event[];
  };

  const EventsWrapper = styled(Box)`
    margin-left: auto;
    margin-right: auto;
    max-width: 50%;
    @media (max-width: 500px) {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
      max-width: 95%;
    }
  `;

  return (
    <>
      {console.log(separatedEvents)}
      <GlobalStyles />
      <EventsWrapper>
        {separatedEvents &&
          Object.keys(separatedEvents).map((date) => {
            return separatedEvents[date].map((event: Event, index: number) => {
              const key = `${date}-${index}`; // Unique key
              if (index === 0) {
                return (
                  <React.Fragment key={key}>
                    <DateText>{date}</DateText>
                    <Timeslot
                      key={key}
                      presenters={event.presenter}
                      endTime={event.end}
                      heading={event.title}
                      startTime={event.start}
                      type={types.TimeslotType.ExternalPresentation}
                      location={event.location}
                    >
                      <p>{event.details}</p>
                    </Timeslot>
                  </React.Fragment>
                );
              } else {
                return (
                  <Timeslot
                    key={key}
                    connectToPrevious={index !== 0}
                    presenters={event.presenter}
                    endTime={event.end}
                    heading={event.title}
                    startTime={event.start}
                    type={types.TimeslotType.ExternalPresentation}
                    location={event.location}
                  >
                    <p>{event.details}</p>
                  </Timeslot>
                );
              }
            });
          })}
      </EventsWrapper>
    </>
  );
};
