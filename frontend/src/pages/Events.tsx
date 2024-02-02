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
import { sep } from 'path';

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
    ],
  };
  const [events, setEvents] = useState(placeholderEvents);

  const separateEventsByDate = (events: Events): { [key: string]: Event[] } => {
    const separatedEvents: { [key: string]: Event[] } = {};

    events.events.forEach((event) => {
      const date = event.start.toDateString();

      if (!separatedEvents[date]) {
        separatedEvents[date] = [];
      }

      separatedEvents[date].push(event);
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
      {console.log(Object.keys(separatedEvents))}
      <GlobalStyles />
      <EventsWrapper>
        {separatedEvents &&
          //map through each array inside the events array and return a Timeslot component for each event

          separatedEvents.events.map((event: Event, index) => {
            if (index === 0) {
              console.log(event.presenter);
              return (
                <>
                  <p>{Object.keys(separatedEvents)}</p>
                  <Timeslot
                    key={event.id}
                    presenters={event.presenter}
                    endTime={event.end}
                    heading={event.title}
                    startTime={event.start}
                    type={types.TimeslotType.ExternalPresentation}
                    location={event.location}
                  >
                    <p>{event.details}</p>
                  </Timeslot>
                </>
              );
            } else {
              return (
                <Timeslot
                  key={event.id}
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
          })}
      </EventsWrapper>
    </>
  );
};
