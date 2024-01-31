import {
  Horizontal,
  Timeslot,
  Vertical,
  types,
  spacing,
  width,
  Wrapper,
} from '@kokitotsos/react-components';
import React, { useState } from 'react';
import styled from '@emotion/styled';

export const Events = () => {
  const placeholderEvents: Events = {
    events: [
      {
        id: 1,
        user_id: '1',
        review_id: 1,
        winner: true,
        type: types.TimeslotType.Presentation,
        presenter: 'Magnus',
        location: '57.7092833,11.9889706',
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
        presenter: 'Alireza',
        location: '57.7092833,11.9889706',
        title: 'ER-diagram is the shit',
        details: 'PostgreSQL rules them all!',
        start: new Date('2024-02-05T13:00:00'),
        end: new Date('2024-02-05T14:00:00'),
      },
    ],
  };
  const [events, setEvents] = useState(placeholderEvents);

  type Event = {
    id: number;
    user_id: string;
    review_id: number;
    winner: boolean;
    type: types.TimeslotType;
    presenter: string;
    location: string;
    title: string;
    details: string;
    start: Date;
    end: Date;
  };

  type Events = {
    events: Event[];
  };

  const StyledHorizontal = styled(Horizontal)`
    margin-left: ${-spacing.medium / 2}px;
    margin-right: ${-spacing.medium / 2}px;

    > * {
      flex: 0 1 calc(${100 / 6}% - ${spacing.medium}px);
      height: 80px;
      margin-left: ${spacing.medium / 2}px;
      margin-right: ${spacing.medium / 2}px;
      margin-top: ${spacing.medium}px;

      @media (max-width: ${width.tablet}px) {
        flex: 0 1 calc(${100 / 4}% - ${spacing.medium}px);
      }

      @media (max-width: ${width.mobileMenu}px) {
        flex: 0 1 calc(${100 / 3}% - ${spacing.medium}px);
      }
    }
  `;

  return (
    <>
      {console.log(events)}
      <Horizontal
        breakpoint={width.mobile}
        distribute={true}
        spacing={spacing.medium}
        style={{ backgroundColor: 'blue' }}
      >
        <Wrapper spacing={spacing.large} style={{ backgroundColor: 'red' }}>
          {events &&
            events.events.map((event: Event) => (
              <Timeslot
                key={event.id}
                connectToPrevious
                endTime={event.end}
                heading={event.title}
                startTime={event.start}
                type={types.TimeslotType.ExternalPresentation}
              >
                <p>{event.details}</p>
              </Timeslot>
            ))}
        </Wrapper>
      </Horizontal>
    </>
  );
};
