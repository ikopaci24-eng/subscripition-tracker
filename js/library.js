
export function getStatus(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const renewal = new Date(date + "T00:00:00");

  return renewal < today ? "Expired" : "Active";
}

export function createSubscription(service, provider, subscriber, renewalDate, category) {
  return {
    id: crypto.randomUUID(),
    service,
    provider,
    subscriber,
    renewalDate,
    category
  };
}

export function countExpired(subscriptions) {
  return subscriptions.filter(
    item => getStatus(item.renewalDate) === "Expired"
  ).length;
}

export function saveSubscriptions(subscriptions) {
  localStorage.setItem(
    "subscriptions",
    JSON.stringify(subscriptions)
  );
}

export function loadSubscriptions() {
  try {
    return JSON.parse(
      localStorage.getItem("subscriptions")
    ) || [];
  } catch {
    return [];
  }
}
