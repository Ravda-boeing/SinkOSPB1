#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <unistd.h> // for sleep()

void displayClock() {
    time_t now;
    struct tm *tm_info;
    char buffer[9];

    time(&now);
    tm_info = localtime(&now);
    strftime(buffer, 9, "%H:%M:%S", tm_info);
    printf("🕒 %s\n", buffer);
}

void showStartMenu() {
    printf("\n--- 🌀 Sink Menu ---\n");
    printf("[1] ⚙️ Settings\n");
    printf("[2] 🌐 Sink Browser\n");
    printf("[3] 🧠 AI\n");
    printf("[4] 📃 Writer\n");
    printf("[5] 🗂️ Sink Explorer\n");
    printf("[6] 📺 Cue Card Creator\n");
    printf("[7] 📨 Sink OS Email\n");
    printf("[8] 🖥️ Background\n");
    printf("[9] 🩺 Health Check\n");
    printf("[0] 🔻 Shutdown\n");
}

int main() {
    char input[10];
    while (1) {
        system("clear");  // or "cls" on Windows
        printf("=== Sink OS Taskbar ===\n");
        displayClock();
        printf("\nPress 's' to open Start Menu or 'q' to quit:\n> ");
        fgets(input, sizeof(input), stdin);

        if (input[0] == 's') {
            showStartMenu();
            printf("\nSelect an option:\n> ");
            fgets(input, sizeof(input), stdin);
            if (input[0] == '0') {
                printf("\n🔻 Confirm shutdown? [y/n]: ");
                fgets(input, sizeof(input), stdin);
                if (input[0] == 'y') {
                    printf("\nSink OS powering down... 😴\n");
                    sleep(1);
                    exit(0);
                }
            }
        } else if (input[0] == 'q') {
            break;
        }
        sleep(1);
    }
    return 0;
}