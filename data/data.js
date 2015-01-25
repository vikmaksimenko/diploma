// create an array with nodes
  var nodes = [
    {id: 'PP 1.3.1', label: "", level: '1', title: 'Основи програмування',  group: 'PP'},
    {id: 'PP 1.3.2', label: "", level: '1', title: 'Комп\'ютерна дискретна математика', group: 'PP'},
    {id: 'PP 1.3.3', label: "", level: '1', title: 'Алгоритми та структури даних', group: 'PP'},
    {id: 'PP 1.3.4', label: "", level: '1', title: 'Професійна практика програмної інженерії', group: 'PP'},
    {id: 'PP 1.3.5', label: "", level: '1', title: 'Архітектура комп\'ютера', group: 'PP'},
  //  {id: 'PP 1.3.6', label: "", level: '1', title: 'Економіка програмного забезпечення', group: 'PP'},
    {id: 'PP 1.3.7', label: "", level: '2', title: 'Об\'єктно-орієнтоване програмування', group: 'PP'},
    {id: 'PP 1.3.8', label: "", level: '2', title: 'Основи програмної інженерії', group: 'PP'},
  //  {id: 'PP 1.3.9', label: "", level: '2', title: 'Групова динаміка і комунікації', group: 'PP'},
    {id: 'PP 1.3.10', label: "", level: '2', title: 'Бази даних', group: 'PP'},
  //  {id: 'PP 1.3.11', label: "", level: '2', title: 'Емпіричні методи програмної інженерії', group: 'PP'},
    {id: 'PP 1.3.12', label: "", level: '2', title: 'Аналіз вимог до програмного забезпечення', group: 'PP'},
    {id: 'PP 1.3.13', label: "", level: '2', title: 'Операційні системи', group: 'PP'},
    {id: 'PP 1.3.14', label: "", level: '2', title: 'Організація комп\'ютерних мереж', group: 'PP'},
  // {id: 'PP 1.3.15', label: "", level: '3', title: 'Англійська мова (за проф. спрямуванням)', group: 'PP'},
    {id: 'PP 1.3.16', label: "", level: '3', title: 'Людино-машинна взаємодія', group: 'PP'},
    {id: 'PP 1.3.17', label: "", level: '3', title: 'Конструювання програмного забезпечення', group: 'PP'},
    {id: 'PP 1.3.18', label: "", level: '3', title: 'Моделювання та аналіз програмного забезпечення', group: 'PP'}, 
    {id: 'PP 1.3.19', label: "", level: '3', title: 'Програмування Інтернет', group: 'PP'},
    {id: 'PP 1.3.20', label: "", level: '3', title: 'Архітектура та проектування програмного забезпечення', group: 'PP'},
    {id: 'PP 1.3.21', label: "", level: '4', title: 'Якість програмного забезпечення та тестування', group: 'PP'},
    {id: 'PP 1.3.22', label: "", level: '4', title: 'Менеджмент проектів програмного забезпечення', group: 'PP'},
    {id: 'PP 1.3.23', label: "", level: '4', title: 'Безпека програм та даних', group: 'PP'},
    {id: 'PP 1.3.24', label: "", level: '4', title: 'Проектний практикум', group: 'PP'},
    // {id: 'PP 1.3.25', label: "", title: 'Безпека життєдіяльності', group: 'PP'},
    // {id: 'PP 1.3.26', label: "", title: 'Основи охорони праці', group: 'PP'},
  ];

  // create an array with edges
  var edges = [
    {to: 'PP 1.3.1', from: 'PP 1.3.2', title: "Имя темы"},
    {to: 'PP 1.3.1', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.1', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.1', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.1', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.2', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.2', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.3', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.3', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.3', from: 'PP 1.3.3', title: "Имя темы"},  
    // {to: 'PP 1.3.3', from: 'PP 1.3.3', title: "Имя темы"},  
    {to: 'PP 1.3.4', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.4', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.4', from: 'PP 1.3.3', title: "Имя темы"},
    // to: 'PP 1.3.4', from: 'PP 1.3.3', title: "Имя темы"},
    {to: 'PP 1.3.5', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.5', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.5', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.5', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.6', from: '?', title: "Имя темы"},
    {to: 'PP 1.3.7', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.7', from: 'PP 1.3.2', title: "Имя темы"},
    {to: 'PP 1.3.7', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.7', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.7', from: 'PP 1.3.3', title: "Имя темы"},
    {to: 'PP 1.3.8', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.8', from: 'PP 1.3.4', title: "Имя темы"},
    // {to: 'PP 1.3.9', from: '?', title: "Имя темы"},
    {to: 'PP 1.3.10', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.10', from: 'PP 1.3.2', title: "Имя темы"},
    {to: 'PP 1.3.10', from: 'PP 1.3.3', title: "Имя темы"},
    {to: 'PP 1.3.10', from: 'PP 1.3.7', title: "Имя темы"},
    // {to: 'PP 1.3.11', from: '?', title: "Имя темы"},
    {to: 'PP 1.3.12', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.12', from: 'PP 1.3.2', title: "Имя темы"},
    {to: 'PP 1.3.12', from: 'PP 1.3.3', title: "Имя темы"},
    {to: 'PP 1.3.12', from: 'PP 1.3.7', title: "Имя темы"},
    // {to: 'PP 1.3.12', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.12', from: 'PP 1.3.3', title: "Имя темы"},
    {to: 'PP 1.3.13', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.13', from: 'PP 1.3.2', title: "Имя темы"},
    {to: 'PP 1.3.13', from: 'PP 1.3.3', title: "Имя темы"},
    {to: 'PP 1.3.13', from: 'PP 1.3.5', title: "Имя темы"},
    {to: 'PP 1.3.13', from: 'PP 1.3.7', title: "Имя темы"},
    // {to: 'PP 1.3.13', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.13', from: 'PP 1.3.3', title: "Имя темы"},
    {to: 'PP 1.3.14', from: 'PP 1.3.3', title: "Имя темы"},
    {to: 'PP 1.3.14', from: 'PP 1.3.5', title: "Имя темы"},
    // {to: 'PP 1.3.14', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.14', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.14', from: 'PP 1.3.3', title: "Имя темы"},
    // {to: 'PP 1.3.15', from: '?', title: "Имя темы"},
    {to: 'PP 1.3.16', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.16', from: 'PP 1.3.7', title: "Имя темы"},
    {to: 'PP 1.3.16', from: 'PP 1.3.8', title: "Имя темы"},
    {to: 'PP 1.3.16', from: 'PP 1.3.13', title: "Имя темы"},
    {to: 'PP 1.3.17', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.17', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.17', from: 'PP 1.3.2', title: "Имя темы"},
    {to: 'PP 1.3.17', from: 'PP 1.3.3', title: "Имя темы"},
    {to: 'PP 1.3.17', from: 'PP 1.3.7', title: "Имя темы"},
    {to: 'PP 1.3.17', from: 'PP 1.3.8', title: "Имя темы"},
    {to: 'PP 1.3.17', from: 'PP 1.3.12', title: "Имя темы"},
    // {to: 'PP 1.3.17', from: 'PP 1.3.13', title: "Имя темы"},
    {to: 'PP 1.3.18', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.18', from: 'PP 1.3.7', title: "Имя темы"},
    {to: 'PP 1.3.18', from: 'PP 1.3.8', title: "Имя темы"},
    {to: 'PP 1.3.19', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.19', from: 'PP 1.3.3', title: "Имя темы"},
    {to: 'PP 1.3.19', from: 'PP 1.3.14', title: "Имя темы"},
    // {to: 'PP 1.3.19', from: 'PP 1.3.8', title: "Имя темы"},
    // {to: 'PP 1.3.19', from: 'PP 1.3.13', title: "Имя темы"},
    // {to: 'PP 1.3.19', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.21', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.21', from: 'PP 1.3.7', title: "Имя темы"},
    {to: 'PP 1.3.21', from: 'PP 1.3.20', title: "Имя темы"},
    // {to: 'PP 1.3.21', from: 'PP 1.3.7', title: "Имя темы"},
    {to: 'PP 1.3.22', from: 'PP 1.3.8', title: "Имя темы"},
    {to: 'PP 1.3.22', from: 'PP 1.3.12', title: "Имя темы"},
    {to: 'PP 1.3.22', from: 'PP 1.3.20', title: "Имя темы"},
    {to: 'PP 1.3.23', from: 'PP 1.3.1', title: "Имя темы"},
    {to: 'PP 1.3.23', from: 'PP 1.3.10', title: "Имя темы"},
    {to: 'PP 1.3.23', from: 'PP 1.3.13', title: "Имя темы"},
    {to: 'PP 1.3.23', from: 'PP 1.3.14', title: "Имя темы"},
    {to: 'PP 1.3.23', from: 'PP 1.3.19', title: "Имя темы"},
    // {to: 'PP 1.3.23', from: 'PP 1.3.12', title: "Имя темы"},
    // {to: 'PP 1.3.23', from: 'PP 1.3.20', title: "Имя темы"},
    // {to: 'PP 1.3.23', from: 'PP 1.3.12', title: "Имя темы"},
    {to: 'PP 1.3.24', from: 'PP 1.3.4', title: "Имя темы"},
    {to: 'PP 1.3.24', from: 'PP 1.3.7', title: "Имя темы"},
    {to: 'PP 1.3.24', from: 'PP 1.3.12', title: "Имя темы"},
    {to: 'PP 1.3.24', from: 'PP 1.3.16', title: "Имя темы"},
    {to: 'PP 1.3.24', from: 'PP 1.3.17', title: "Имя темы"},
    {to: 'PP 1.3.24', from: 'PP 1.3.22', title: "Имя темы"},
  ];
