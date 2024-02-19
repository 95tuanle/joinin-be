export class UpdateEventDto {
  eventId: string;
  eventName?: string;
  eventDesc?: string;
  eventVenue?: string;
  eventStartDate?: Date;
  eventEndDate?: Date;
}
