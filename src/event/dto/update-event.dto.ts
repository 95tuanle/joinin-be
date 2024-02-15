export class UpdateEventDto {
  eventId: string;
  requestUser: string;
  eventName?: string;
  eventDesc?: string;
  eventVenue?: string;
  eventDateTime?: Date;
}
