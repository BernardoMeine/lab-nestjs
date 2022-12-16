/* eslint-disable prettier/prettier */
import { makeNotification } from "@test/factory/notification-factory";
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";

let notificationsRepository: InMemoryNotificationsRepository;
let countRecipientNotifications: CountRecipientNotifications;

/* eslint-disable prettier/prettier */
describe("Count Recipient Notifications", () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository()
    countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);
  })

  it('should be able to count recipient notifications', async () => {

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }),);

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }),);

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }),);


    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);

  });
})