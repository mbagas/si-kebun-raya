<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DataRequestEmail extends Notification
{
    use Queueable;

    /**
     * @var array $project
     */
    protected $project;

    /**
     * Create a new notification instance.
     */

    public function __construct($project)
    {
    //
      $this->project = $project;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                ->greeting($this->project['greeting'])
                ->line($this->project['body'])
                ->line($this->project['result'])
                ->action($this->project['actionText'], $this->project['actionURL'])
                ->line($this->project['thanks']);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
