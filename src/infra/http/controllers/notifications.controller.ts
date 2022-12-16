/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CancelNotification } from '@application/useCases/cancel-notification';
import { CountRecipientNotifications } from '@application/useCases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/useCases/get-recipient-notifications';
import { ReadNotification } from '@application/useCases/read-notification';
import { UnreadNotification } from '@application/useCases/unread-notification';
import { SendNotification } from 'src/application/useCases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../mappers/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    })

    return {
      count,
    }
  }


  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    })

    return {
      notifications: notifications.map(NotificationViewModel.toController),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    });

    const raw = NotificationViewModel.toController(notification)

    return {
      raw
    };
  }
}
