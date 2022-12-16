/* eslint-disable prettier/prettier */
import { makeNotification } from "@test/factory/notification-factory";
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { ReadNotification } from "./read-notification";

let notificationsRepository: InMemoryNotificationsRepository;
let readNotification: ReadNotification;

/* eslint-disable prettier/prettier */
describe("Read Notification", () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository()
    readNotification = new ReadNotification(notificationsRepository);
  })

  it('should be able to read a notification', async () => {

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));

  });

  it('should not bet able to read a non-existing notification', async () => {

    expect(() => {
      return readNotification.execute({
        notificationId: "fake-notificationId"
      })
    }).rejects.toThrow("Notification not found");
  })
})