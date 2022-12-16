/* eslint-disable prettier/prettier */
import { makeNotification } from "@test/factory/notification-factory";
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { UnreadNotification } from "./unread-notification";

let notificationsRepository: InMemoryNotificationsRepository;
let unreadNotification: UnreadNotification;

/* eslint-disable prettier/prettier */
describe("Unread Notification", () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository()
    unreadNotification = new UnreadNotification(notificationsRepository);
  })

  it('should be able to unread a notification', async () => {

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(null);

  });

  it('should not bet able to read a non-existing notification', async () => {

    expect(() => {
      return unreadNotification.execute({
        notificationId: "fake-notificationId"
      })
    }).rejects.toThrow("Notification not found");
  })
})