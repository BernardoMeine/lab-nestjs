/* eslint-disable prettier/prettier */
import { makeNotification } from "@test/factory/notification-factory";
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";

let notificationsRepository: InMemoryNotificationsRepository;
let cancelNotification: CancelNotification;

/* eslint-disable prettier/prettier */
describe("Cancel Notification", () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository()
    cancelNotification = new CancelNotification(notificationsRepository);
  })

  it('should be able to cancel a notification', async () => {

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));

  });

  it('should not bet able to cancel a non-existing notification', async () => {

    expect(() => {
      return cancelNotification.execute({
        notificationId: "fake-notificationId"
      })
    }).rejects.toThrow("Notification not found");
  })
})

