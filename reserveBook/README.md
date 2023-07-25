# Dokumentacja projektu nr 2

## Osoby tworzące: 
Adam Walka (backend), Michał Myśliwiec (frontend)

## Projekt reserveBook:

### Identyfikacja zagadnienia biznesowego

Celem projektu to stworzenie aplikacji do zarządzania biblioteką książek jak i również, która umożliwia łatwy i przystępniejszy dostęp wszystkim osobom korzystającym z usług biblioteki. Począwszy od osób chcących wypożyczyć książkę przez internet, skończywszy na osobach które pracują w danej bibliotece i zarządzają procesami występującymi w obsłudze całej placówki. Wszyscy użytkownicy chcący korzystać w pełni z aplikacji mogą się w prosty sposób zarejestrować a następnie zalogować aby korzystać z odpowiednio dobranych części aplikacji do roli użytkownika.
Zwykły użytkownik jest w stanie sprawdzić stan biblioteki i wybrać sobie pozycję do wypożyczenia, a następnie zarezerwować ją aby móc odebrać fizyczną wersję w placówce. Administrator biblioteki jest w stanie sprawdzić stan całej placówki, dodać nowe pozycje jak i również zaktualizować stan magazynu. Aplikacja w pełni rozwiązuje problem prowadzenia biblioteki i obsługi klientów. W razie możliwości i nowych potrzeb, sama aplikacja powinna zostać rozszerzana do wymagań klienta.

### Wymagania systemowe i funkcjonalne

Cały projekt oparto na architekturze MVC. W której modelami są encje w bazie PostgreSQL, kontrolerem aplikacja oparta na frameworku NestJS a widokami zarządza aplikacja Reactowa. Jako sposób komunikacji pomiędzy widokiem a kontrolerem wykorzystano sposób zasad określonych przez REST API przy wykorzystaniu wbudowanej asynchronicznej funkcji fetch. W przypadku połączenia pomiędzy bazą danych a aplikacją backendową wykorzystano ORM - Prisma. Do stylizacji aplikacji frontendowej wykorzystano TailwindCSS. Autoryzację i autentykację oparto tokenie JWT i bibliotece Passport.js. Do wysyłania zdjęć na serwer wykorzystano bibliotekę Multer. 

Funkcjonalności: 
1. Wspólne: 
	- Logowanie użytkownika
	- Rejestracja użytkownika 
	- Informacje na temat systemu
	- Wyświetlanie listy książek
	- Wyświetlanie informacji na temat pojedynczej książki
	- Wyświetlanie informacji o stanie magazynowym książki
	- Informacje o użytkowniku
2. Aplikacja kliencka: 
	- Wyświetlanie informacji na temat aktualnych wypożyczeń
	- Wyświetlanie informacji na temat poprzednich wypożyczeń
	- Możliwość rezerwacji książki
3. Aplikacja administratorska
	- Wyświetlanie stanu magazynu
	- Wyświetlanie wszystkich aktualnych wypożyczeń
	- Wyświetlanie zakończonych wypożyczeń
	- Wpisanie daty oddania wypożyczenia
	- Dodawanie/Usuwanie/Zmiana książek
	- Dodawanie/Usuwanie/Zmiana stanu magazynowego
	- Dodawanie zdjęć okładek książek
	- Zmiana terminów wypożyczenia
	- Dodawanie/Usuwanie/Zmiana autorów książek

### Analiza zagadnienia i jego modelowanie

Ogólny diagram związków encji

![database_full_view][[images/db_full.png]]

Diagram związków encji dla książki

![database_book][[images/db_book.png]]

Diagram związków encji dla użytkownika

![database_user][[images/db_user.png]]

W momencie otrzymania zapytania do serwera, aplikacja serwerowa wybiera odpowiednią ścieżkę która prowadzi do konkretnej metody konkretnego kontrolera. Kontroler odwołuje się do metod serwisu przypisanego do kontrolera. Serwisy wykonują odpowiednią przypisaną logikę biznesową.  W większości przypadków serwisy korzystają z serwisu biblioteki ORM która posiada dostęp do danych biznesowych. Wartość wyjściowa z serwisu zwracana jest do kontrolera który zwraca wyniki w postaci odpowiedzi na zapytanie.

Do dokumentacji listy zasobów wykorzystano narzędzie Swagger. Dostęp do tej dokumentacji można uzyskać poprzez wejście na podstronę `/api` serwera. Taki sposób dokumentacji ułatwia pracę pomiędzy stroną backendową i frontendową. Wynika to z prostoty dostępu jak i sprawdzenia możliwości aplikacji serwerowej. Ze względu na dużą ilość endpointów oraz wykorzystanych przy nich encji zdecydowano się nie wypisywać ich w poniższym pliku. 

### Implementacja

PostgreSQL został wybrany na bazę danych w projekcie. Baza danych hostowana jest za darmo platformie wdrożeniowej Railway. Zdecydowano się na taką opcję ze względu na łatwiejszy dostęp przez obydwie osoby tworzące obiekt. Takie rozwiązanie oznacza te same dane ale co istotniejsze to samo odzwierciedlenie w encjach. Do połączenia wykorzystano ORM o nazwie Prisma. Przy instalacji tworzony jest folder `prisma` w którym zawarte są: źródło danych, generator i model danych. Poniżej znajduje się kawałek kodu z wymienionymi wyżej składowymi: 

```js
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Book {
  id             Int        @id @default(autoincrement())
  title          String
  description    String?
  genre          Genre
  publishingDate DateTime
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
  pages          Int?
  publisher      String
  language       String
  BookCover      BookCover?
  storage        Storage[]
  authors        Author[]   @relation("AuthorToBook")
}
```

Po stronie serwera wykorzystano bibliotekę NestJS która oparta jest na bibliotece Express bazującej na środowisku Node.js. W celu korzystania z ORM'a w aplikacji trzeba stworzyć folder `prisma` wraz z modułem i serwisem. Moduł potrzebny będzie do dalszego wykorzystania instancji napisanego serwisu. Serwis będzie rozszerzał interfejs `PrismaClient` i implementował metodę `OnModuleInit `która będzie sprawi, iż serwis zachowa się jak singleton. Poniżej znajduje się implementacja serwisu: 

```js
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
```

NestJS w odróżnieniu od Expressa posiada zdefiniowaną strukturę pokazaną na zdjęciu poniżej:
![nest_modules][[images/nest_module.png]]

Każda aplikacja napisana w tym frameworku posiada jeden główny moduł. Jest on punktem wyjścia którego Nest używa do zbudowania grafu aplikacji - wewnętrznej struktury danych. Nest używa tego do rozwiązywania relacji i zależności między modułami i dostawcami. Poniżej kod głównego modułu: 
```js
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { StorageModule } from './storage/storage.module';
import { CoverModule } from './cover/cover.module';
import { resolve } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
  
@Module({
  imports: [
    PrismaModule,
    BookModule,
    AuthorModule,
    UserModule,
    AuthModule,
    OrderModule,
    StorageModule,
    CoverModule,
    ServeStaticModule.forRoot(
      (() => {
        const publicDir = resolve('./files/');
        const servePath = '/files';
        return {
          rootPath: publicDir,
          serveRoot: servePath,
          exclude: ['/api*'],
        };
      })(),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
```

Plikiem inicjalizującym całą aplikację jest  `main.ts`, w którym importowany jest główny moduł. W tym miejscu możemy również skonfigurować aplikację. W przypadku opisywanej aplikacji, włączono CORS, pipe który transformuje dane do potrzebnej formy ,  interceptor który przechwytuje zapytania i transformuje dane wyjściowe i wejściowe do zaznaczonych w kodzie. Ostatnią rzeczą inicjalizacyjną jest moduł Swaggera, który stanowi dokumentację API. 

```js
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Book Reservation System')
    .setDescription('This is swagger for Book Reservation System')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
```

Każdy katalog to osobny zasób który łączony jest przez własny moduł jest z modułem głównym. Katalogi posiadają strukturę pokazaną na poniższym zdjęciu: 
![nest_resource][[images/nest_resource.png]]

Większość zasobów posiada bardzo podobną strukturę i budowę. Kontroler który przekazuje informacje zawarte w zapytaniu do serwisu który łączy się z bazą danych przez serwis ORM, a na samym końcu zwracający informacje otrzymane z bazy danych. Poniżej przykład dla tworzenia książki: 

```js
@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BookEntity })
  async createBook(@Body() createBookDto: CreateBookDto) {
    return new BookEntity(await this.bookService.createBook(createBookDto));

  }
```

```js
@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async createBook({
    title,
    description,
    genre,
    publisher,
    publishingDate,
    language,
    pages,
    authorsIds,
  }: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        title,
        description,
        genre,
        publisher,
        publishingDate,
        language,
        pages,
        authors: {
          connect: authorsIds.map((authorId) => ({ id: authorId })),
        },
      },
    });
  }
```

Ważnym elementem projektu jest Autentykacja dlatego poniżej przedstawiono funkcję logowania: 

```js
async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }),
    };
  }
```

Na początku wykonuje się sprawdzenie czy podany użytkownik istnieje. W przypadku gdy nie istnieje zwracany jest kod błędu nie znaleziono. Następuje sprawdzenie czy podane hasło jest równe temu hasło które wysłał użytkownik. Gdy hasło jest niepoprawne zwracany jest błąd autoryzacji. W innym przypadku zwracany jest podpisany token JWT wraz z podstawowymi informacjami o użytkowniku.  Wykorzystywany jest serwis JWT wbudowany w Nest. Inicjalizowany jest on za pomocą  importu w module zasobu auth.
```js
JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60min' },
    }),
```

Dodatkowo wykorzystywana jest strategia z bilbioteki Passport - `PassportStrategy`. Która przechwytuje i waliduje przesyłany token. 
```js
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { userId: number }) {
    const user = await this.userService.getUserById(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
```

Kolejnym specjalnym zasobem jest wysyłanie i pobieranie zdjęć okładek książek.
Głównym elementem jest konfiguracja biblioteki Multer odpowiedzialnej za sprawdzenie, przetworzenie i przesłanie pliku na serwer. W opcjach przekazane są: limit wielkości pliku(ok. 5 mB), filtracja odpowiednich rozszerzeń czy to jak ma zostać przechowywany plik(miejsce na serwerze, nazwa pliku).

```js
export const multerOptions: MulterOptions = {
  limits: {
    fileSize: 5242880,
  },
  fileFilter(req, file, callback) {
    if (file.mimetype.match(/\/(jpg|png|jpeg)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException('Unsupported file type', HttpStatus.BAD_REQUEST),
        false,
      );
    }
  },

  storage: diskStorage({
    destination(req, file, callback) {
      const uploadPath = process.env.UPLOAD_DIR;
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },
    filename(req, file, callback) {
      callback(null, generateFileName(file.originalname));
    },
  }),
};
```

Opcje wykorzystywane są w dekoratorze endpointu `@UseInterceptors(FileInterceptor('cover', multerOptions))`. 

Po stronie klienta wykorzystano bilbiotekę React wraz takimi bilbiotekami jak: 
- React Router
- TailwindCSS
- DaisyUI
- Zustand
- React Query
- React Hook Form

TailwindCSS wraz z DaisyUI odpowiadają za wygląd całej aplikacji. 
Plikiem w którym inicjalizowana jest aplikacja jest `main.tsx`. Znajdują się w nim providery do tarasowania poprzez bibliotekę React Router, jak i bibliotekę do fetchowania danych - React Query. Która znacznie ułatwia operowanie pobieranymi danymi. 

```jsx
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
```

Natomiast w głównym pliku aplikacji czyli `App.jsx` zdefiniowane są podstawy routingu, takie jak trasy ale również funkcja tworząca prywatne trasy. Dodatkowo znajduje się też kod który utrzymuje stan zalogowania użytkownika, poprzez odczytanie tokenu JWT z local storage.

```jsx
function PrivateRoute({ children }: { children: ReactElement }) {
  const { id } = useUserStore();
  return id ? children : <Navigate to="/login" />;
}

function App() {
  const setUser = useUserStore((state) => state.setUser);
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const decodedToken: User = jwtDecode(accessToken as string);
    setUser(decodedToken);
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="books">
          <Route index element={<BookOverviewPage />} />
          <Route path=":bookId" element={<BookPage />} />
        </Route>
        <Route path="user">
          <Route
            index
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="reserve"
            element={
              <PrivateRoute>
                <ReservePage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
```

Zustand to menadżer stanu przechowywujący informacje na temat zalogowanego użytkownika. W poniższym kodzie tworzony jest stan początkowy wraz z możliwymi akcjami do wykonania, oraz główna część czyli stworzenie pojedynczego magazynu danych dla całej aplikacji. 

```js
type State = {
  firstName: string;
  lastName: string;
  email: string;
  id: number | undefined;
};

type Actions = {
  setUser: (user: User) => void;
  reset: () => void;
};

const initialState: State = {
  firstName: "",
  lastName: "",
  email: "",
  id: undefined,
};

export const useUserStore = create<State & Actions>()((set) => ({
  ...initialState,
  setUser: (user: User) => {
    set({ ...user });
  },
  reset: () => {
    set(initialState);
  },
}));
```

React Router jest bardzo przydatny przy pobieraniu danych, dzięki wykorzystaniu hooków `useQuery` i `useMutation` jesteśmy w stanie dowiedzieć się w jakim stanie jest nasze zapytanie a także możemy bezpośrednio korzystać z danych. 
```js
const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["book"],
    queryFn: async () => getBook(bookId as string),
  });

  
  const { mutate: reservation } = useMutation({
    mutationFn: reserveBook,
    onSuccess: () => {
      navigate("/user");
    },
  });
```

React Hook Form natomiast to proste tworzenie formularzy i przekazywanie ich stanu. Poniżej przykład logowania:
```jsx
 const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUser>();

  return (
    <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-96">
      <div className="card-body">
        <form onSubmit={handleSubmit(signIn)} className="form-control">
          <div className="">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-11/12"
              placeholder="email"
              {...register("email", { required: true, minLength: 8 })}
            />
          </div>
          <div className="">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered w-11/12"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
          </div>
          <input
            type="submit"
            value="Sign in"
            className="btn btn-primary mt-5"
          />
        </form>
      </div>
    </div>
```


### Podsumowanie

Stworzona aplikacja spełnia zawężone wymagania biznesowe. Pokazuje możliwość dalszego rozwoju i produkcji bardziej zaawansowanej strony. Jednakże spełnia jedno z najważniejszych założeń początkowych faz projektów czyli wypuszczenia jej do użytkowników aby umożliwić im łatwiejszy dostęp do wypożyczania książek. Aplikacja posiada działające funkcjonalności z części wspólnej jak i z części aplikacji klienckiej. Po stronie serwera zaimplementowano wszystkie główne funkcjonalności, mimo to stworzenie części administratorskiej po stronie klienta równałoby się ze stworzeniem de facto całej osobnej aplikacji. 

Z większych trudności po stronie backendowej okazały się: obsługa tokenów JWT  i biblioteki Passport oraz umieszczanie wysyłanych zdjęć okładek na serwer. Dodatkowo problemem przy okazji budowania bardziej zaawansowanej struktury bazy danych, przez brak wiedzy i doświadczenia w tym zakresie.

Jeżeli chodzi o frontend to problem ukazał się przy okazji korzystania z biblioteki Tailwind pomimo, iż odzwierciedla klasy CSS jest to całkowicie inny sposób pisania styli. Początkowo trudności wystąpiły przy korzystaniu biblioteki React Query. 

Oczywiście rozwój powinien następować w kierunku stworzenia części administratorskiej jednakże, pomimo wypisania dużej części funkcji aplikacji możliwe jest:
- stworzenie osobnej encji kategorii, która łączyłaby kilka gatunków w sobie
- możliwość filtracji po autorach czy dodanych kategoriach, czy innych właściwościach
- analityka i śledzenie zachowań użytkownika
- możliwość udostępniania wersji pdf książek z otwartych źródeł