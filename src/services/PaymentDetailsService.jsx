const BASE_URL = "/api/payment-details";

export async function createPaymentDetails(paymentDetails, studentId) {
  const response = await fetch(`${BASE_URL}/${studentId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentDetails),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function fetchPaymentDetailsByStudentId(studentId) {
  const response = await fetch(`${BASE_URL}/${studentId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch payment details");
  }
  return response.json();
}

export async function updatePaymentDetails(paymentDetailsId, paymentDetails) {
  const response = await fetch(`${BASE_URL}/${paymentDetailsId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentDetails),
  });
  if (!response.ok) {
    throw new Error("Failed to update payment details");
  }
  return response.json();
}

export async function deletePaymentDetails(paymentDetailsId) {
  const response = await fetch(`${BASE_URL}/${paymentDetailsId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete payment details");
  }
  return response.json();
}

export async function getPaymentHistoryByStudentId(studentId) {
  const response = await fetch(`${BASE_URL}/payment-history/${studentId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch payment history");
  }
  return response.json();
}
