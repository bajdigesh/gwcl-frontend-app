const ExceptionData = {
  payload: [
    {
      account_name: 'John Doe',
      account_number: '010104174161	',
      meter_number: '27364892',
      exception_title: 'Exception 1',
      exception_detail: 'A faulty meter cannot give a valid reading',
      next_step_title: 'Confirm Meter Status',
      next_step_detail: 'Meter Reader needs to check',
      meter_status: 'need_to_be_confirmed',
    },
    {
      account_name: 'John Doe',
      account_number: '010104174161	',
      meter_number: '27364892',
      exception_title: 'Exception 1',
      exception_detail: 'A faulty meter cannot give a valid reading',
      next_step_title: 'Meter Changed',
      next_step_detail: 'Admin needs to accept the changes',
      meter_status: 'changed',
    },

    {
      account_name: 'John Doe',
      account_number: '010104174161	',
      meter_number: '27364892',
      exception_title: 'Exception 1',
      exception_detail: 'A faulty meter cannot give a valid reading',
      next_step_title: 'Meter not Faulty.',
      next_step_detail: 'Update meter status to Active',
      meter_status: 'not_faulty',
    },
  ],
  meta_data: [
    {
      pagination: {
        total: 7,
        per_page: 15,
        last_page: 1,
        current_page: 1,
        from: 1,
        to: 7,
      },
    },
  ],
};

export default ExceptionData;
