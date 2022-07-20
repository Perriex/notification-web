function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }
  return true;
}

export const allow_notification = (act) => {
  if (!("Notification" in window)) {
    alert("Your browser cannot send notification! please change and retry.");
  } else {
    if (checkNotificationPromise()) {
      Notification.requestPermission().then((permission) => {
        act(permission === "granted");
      });
    } else {
      Notification.requestPermission(function (permission) {
        act(permission === "granted");
      });
    }
  }
};
