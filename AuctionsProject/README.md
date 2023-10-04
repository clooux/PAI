# Tematyka i wymagania projektu indywidualnego
## 1. Zagadnienie biznesowe:  
Proszę zaprojektować i zaimplementować aplikację internetową, która umożliwia ogłaszanie przetargów przez dowolną instytucję oraz wzięcie w nich udziału, również przez dowolną instytucję/osobę. Aplikacja powinna działać w modelu renderowania widoku na serwerze (SSR  Server Side Rendering).  

## 2. Opis podstawowych funkcjonalności:  
- a stronie głównej powinna znajdować się nawigacja (menu) z następującymi zakładkami  (wyświetlanymi na stałe):  
	+ strona główna,  
	+ lista przetargów,  
	+ lista zakończonych przetargów,  
	+ dodaj przetarg  

- na stronie głównej - krótka informacja tekstowa o przeznaczeniu systemu (1-2 zdania),  

- w zakładce “lista przetargów”: wyświetlenie listy aktualnie trwających przetargów z  następującymi informacjami (np. w postaci tabeli): liczba porządkowa, nazwa/tytuł przedmiotu przetargu, data i godzina rozpoczęcia zbierania ofert w przetargu, data i godzina zakończenia przyjmowania ofert w przetargu (data i godzina),  

- na wyświetlanej liście po naciśnięciu tytułu/nazwy przetargu powinny zostać  wyświetlone szczegółowe informacje (po przejściu na nową stronę) o przedmiocie  przetargu np. opis przetargu, nazwa instytucji zamawiającej, 

- w szczegółach oferty powinien być dostępny przycisk “złóż ofertę” w przetargu, 

- funkcjonalność “złóż ofertę w przetargu” powinna zawierać formularz, który zapisze  następujące informacje: nazwa składającego ofertę (pole tekstowe), wartość oferty (wartość liczbowa) oraz w sposób automatyczny powinien być zapisywany czas i data złożenia oferty.  Funkcjonalność ta powinna być aktywna wyłącznie wtedy kiedy przetarg wciąż trwa,

- lista zakończonych przetargów - lista wyświetla te same informacje co w przypadku przetargów trwających, z tą różnicą, że w zamiast dat znajduje się stała informacja o zakończeniu zbierania ofert. Na liście po przejściu do szczegółów danego przetargu powinna znajdować się lista złożonych ofert dla danego przetargu, uszeregowana w kolejności tej która jest najkorzystniejsza cenowo oraz jednocześnie nie przekracza budżetu danego przetargu. W przypadku jeśli wszystkie oferty w danym przetargu przekraczają budżet przetargu na stronie powinna być wyświetlana informacja o zakończeniu przetargu bez rozstrzygnięcia,  

- zakładka “dodaj przetarg” - umożliwiająca zgłoszenie nowego przetargu, wraz z podaniem wszystkich niezbędnych danych tj. nazwy przedmiotu przetargu, instytucji zamawiającej, opisu przedmiotu przetargu, data i godzina rozpoczęcia oraz zakończenia przetargu (data i godzina), maksymalna wartość jaką może zapłacić zamawiający za realizację przedmiotu zamówienia (ta informacja nie powinna być dostępna w informacji w tabeli na stronie głównej). 

## 3. Wymagania technologiczne:  
- Architektura:  
	- zachowanie logicznej z punktu widzenia danego zagadnienia warstwowej  architektury przygotowywanej aplikacji - MVC,  
	- logiczny podział aplikacji z uwagi na hierarchizację zasobów,  
	- wykorzystanie i podział aplikacji na odpowiednie serwisy funkcjonalne / kontrolery,  
	- relacyjna baza danych, której model odpowiada opisanym funkcjonalnościom  biznesowym (proszę przeprowadzić analizę funkcjonalności i na ich podstawie  stworzyć bazę danych).  
- Back-end:  
	- środowisko Node.js,  
	- pakiet Express.js (architektura MVC),  
	- baza danych SQL (np. MySQL).  
- Front-end:  
	- HTML5, CSS z wykorzystaniem szablonów EJS, PUG lub innego systemu szablonów, umożliwiających generowanie widoku strony w modelu SSR (Server Side Rendering).  
	- Strona nie musi być zaawansowana graficznie, wystarczy użycie podstawowego HTML i CSS. Użycie dodatkowych technologii Front-end np. biblioteki Bootstrap, nie będzie dodatkowe premiowane, ale nie jest również zabronione
