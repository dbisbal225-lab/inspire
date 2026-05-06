export const activarNotificaciones = async () => {
  const permiso = await Notification.requestPermission();

  if (permiso === "granted") {
    new Notification("💊 Medicació", {
      body: "Es hora de tomar tu medicación"
    });
  }
};
