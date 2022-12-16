/* eslint-disable prettier/prettier */
import { makeNotification } from "@test/factory/notification-factory";
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";

let notificationsRepository: InMemoryNotificationsRepository;
let getRecipientNotifications: GetRecipientNotifications;

/* eslint-disable prettier/prettier */
describe("Get recipient notifications", () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository()
    getRecipientNotifications = new GetRecipientNotifications(notificationsRepository);
  })

  it('should be able to get recipient notifications', async () => {

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }),);

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1' }),);

    await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }),);

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'recipient-1' }),
      expect.objectContaining({ recipientId: 'recipient-1' }),
    ]))

  });
})