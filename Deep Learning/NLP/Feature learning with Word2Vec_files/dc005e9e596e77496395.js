document.write('<link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist-embed-9f0a4ad9c85ca776e669003688baa9d55f9db315562ce4d231d37dab2714c70a.css">')
document.write('<div id=\"gist15525249\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-word2vec_model-py\" class=\"file\">\n    \n\n  <div itemprop=\"text\" class=\"blob-wrapper data type-python\">\n      <table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\">\n      <tr>\n        <td id=\"file-word2vec_model-py-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-word2vec_model-py-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">from<\/span> string <span class=\"pl-k\">import<\/span> translate,maketrans,punctuation<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-word2vec_model-py-LC2\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">from<\/span> itertools <span class=\"pl-k\">import<\/span> chain<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-word2vec_model-py-LC3\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">from<\/span> nltk <span class=\"pl-k\">import<\/span> PunktSentenceTokenizer<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-word2vec_model-py-LC4\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">import<\/span> datetime <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-word2vec_model-py-LC5\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">import<\/span> re<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-word2vec_model-py-LC6\" class=\"blob-code blob-code-inner js-file-line\"> <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-word2vec_model-py-LC7\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">def<\/span> <span class=\"pl-en\">log<\/span>(<span class=\"pl-smi\">msg<\/span>):<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L8\" class=\"blob-num js-line-number\" data-line-number=\"8\"><\/td>\n        <td id=\"file-word2vec_model-py-LC8\" class=\"blob-code blob-code-inner js-file-line\">    <span class=\"pl-c1\">print<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&quot;<\/span><span class=\"pl-c1\">{}<\/span> <span class=\"pl-c1\">{}<\/span><span class=\"pl-pds\">&quot;<\/span><\/span>.format(<span class=\"pl-c1\">str<\/span>(datetime.datetime.now()), msg))<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L9\" class=\"blob-num js-line-number\" data-line-number=\"9\"><\/td>\n        <td id=\"file-word2vec_model-py-LC9\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">def<\/span> <span class=\"pl-en\">removeNonAscii<\/span>(<span class=\"pl-smi\">s<\/span>): <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L10\" class=\"blob-num js-line-number\" data-line-number=\"10\"><\/td>\n        <td id=\"file-word2vec_model-py-LC10\" class=\"blob-code blob-code-inner js-file-line\">    <span class=\"pl-k\">return<\/span> <span class=\"pl-s\"><span class=\"pl-pds\">&quot;<\/span><span class=\"pl-pds\">&quot;<\/span><\/span>.join(<span class=\"pl-c1\">filter<\/span>(<span class=\"pl-k\">lambda<\/span> <span class=\"pl-smi\">x<\/span>: <span class=\"pl-c1\">ord<\/span>(x)<span class=\"pl-k\">&lt;<\/span><span class=\"pl-c1\">128<\/span>, s))<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L11\" class=\"blob-num js-line-number\" data-line-number=\"11\"><\/td>\n        <td id=\"file-word2vec_model-py-LC11\" class=\"blob-code blob-code-inner js-file-line\"> <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L12\" class=\"blob-num js-line-number\" data-line-number=\"12\"><\/td>\n        <td id=\"file-word2vec_model-py-LC12\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span> keeps -, +, # in words                            <\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L13\" class=\"blob-num js-line-number\" data-line-number=\"13\"><\/td>\n        <td id=\"file-word2vec_model-py-LC13\" class=\"blob-code blob-code-inner js-file-line\">punctuation <span class=\"pl-k\">=<\/span> punctuation.replace(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>-<span class=\"pl-pds\">&#39;<\/span><\/span>,<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span><span class=\"pl-pds\">&#39;<\/span><\/span>).replace(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>+<span class=\"pl-pds\">&#39;<\/span><\/span>,<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span><span class=\"pl-pds\">&#39;<\/span><\/span>).replace(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>#<span class=\"pl-pds\">&#39;<\/span><\/span>,<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span><span class=\"pl-pds\">&#39;<\/span><\/span>)<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L14\" class=\"blob-num js-line-number\" data-line-number=\"14\"><\/td>\n        <td id=\"file-word2vec_model-py-LC14\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span>makes a C translation dictionary converting punctuations to white spaces<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L15\" class=\"blob-num js-line-number\" data-line-number=\"15\"><\/td>\n        <td id=\"file-word2vec_model-py-LC15\" class=\"blob-code blob-code-inner js-file-line\">Trans <span class=\"pl-k\">=<\/span> maketrans(punctuation, <span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span> <span class=\"pl-pds\">&#39;<\/span><\/span><span class=\"pl-k\">*<\/span><span class=\"pl-c1\">len<\/span>(punctuation))<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L16\" class=\"blob-num js-line-number\" data-line-number=\"16\"><\/td>\n        <td id=\"file-word2vec_model-py-LC16\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span>splits text into sentences&#39;<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L17\" class=\"blob-num js-line-number\" data-line-number=\"17\"><\/td>\n        <td id=\"file-word2vec_model-py-LC17\" class=\"blob-code blob-code-inner js-file-line\">tknr <span class=\"pl-k\">=<\/span> PunktSentenceTokenizer()<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L18\" class=\"blob-num js-line-number\" data-line-number=\"18\"><\/td>\n        <td id=\"file-word2vec_model-py-LC18\" class=\"blob-code blob-code-inner js-file-line\"> <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L19\" class=\"blob-num js-line-number\" data-line-number=\"19\"><\/td>\n        <td id=\"file-word2vec_model-py-LC19\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span>fast ngrammer if you end up using it for phrases<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L20\" class=\"blob-num js-line-number\" data-line-number=\"20\"><\/td>\n        <td id=\"file-word2vec_model-py-LC20\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">def<\/span> <span class=\"pl-en\">ngrammer2<\/span>(<span class=\"pl-smi\">l<\/span>,<span class=\"pl-smi\">n<\/span>):<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L21\" class=\"blob-num js-line-number\" data-line-number=\"21\"><\/td>\n        <td id=\"file-word2vec_model-py-LC21\" class=\"blob-code blob-code-inner js-file-line\">    temp <span class=\"pl-k\">=<\/span> [<span class=\"pl-s\"><span class=\"pl-pds\">&quot;<\/span> <span class=\"pl-pds\">&quot;<\/span><\/span>.join(l[i:i<span class=\"pl-k\">+<\/span>n]) <span class=\"pl-k\">for<\/span> i <span class=\"pl-k\">in<\/span> <span class=\"pl-v\">xrange<\/span>(<span class=\"pl-c1\">0<\/span>,<span class=\"pl-c1\">len<\/span>(l)) <span class=\"pl-k\">if<\/span> <span class=\"pl-c1\">len<\/span>(l[i:i<span class=\"pl-k\">+<\/span>n])<span class=\"pl-k\">==<\/span>n]<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L22\" class=\"blob-num js-line-number\" data-line-number=\"22\"><\/td>\n        <td id=\"file-word2vec_model-py-LC22\" class=\"blob-code blob-code-inner js-file-line\">    <span class=\"pl-k\">return<\/span> temp<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L23\" class=\"blob-num js-line-number\" data-line-number=\"23\"><\/td>\n        <td id=\"file-word2vec_model-py-LC23\" class=\"blob-code blob-code-inner js-file-line\"> <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L24\" class=\"blob-num js-line-number\" data-line-number=\"24\"><\/td>\n        <td id=\"file-word2vec_model-py-LC24\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c1\">print<\/span> <span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>Loading the post data<span class=\"pl-pds\">&#39;<\/span><\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L25\" class=\"blob-num js-line-number\" data-line-number=\"25\"><\/td>\n        <td id=\"file-word2vec_model-py-LC25\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">import<\/span> pickle<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L26\" class=\"blob-num js-line-number\" data-line-number=\"26\"><\/td>\n        <td id=\"file-word2vec_model-py-LC26\" class=\"blob-code blob-code-inner js-file-line\">s<span class=\"pl-k\">=<\/span>pickle.load(<span class=\"pl-c1\">open<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&quot;<\/span>title_and_job.p<span class=\"pl-pds\">&quot;<\/span><\/span>,<span class=\"pl-s\"><span class=\"pl-pds\">&quot;<\/span>rb<span class=\"pl-pds\">&quot;<\/span><\/span>))<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L27\" class=\"blob-num js-line-number\" data-line-number=\"27\"><\/td>\n        <td id=\"file-word2vec_model-py-LC27\" class=\"blob-code blob-code-inner js-file-line\">x_train_RAW<span class=\"pl-k\">=<\/span>[]<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L28\" class=\"blob-num js-line-number\" data-line-number=\"28\"><\/td>\n        <td id=\"file-word2vec_model-py-LC28\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">for<\/span> i <span class=\"pl-k\">in<\/span> s:<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L29\" class=\"blob-num js-line-number\" data-line-number=\"29\"><\/td>\n        <td id=\"file-word2vec_model-py-LC29\" class=\"blob-code blob-code-inner js-file-line\">    <span class=\"pl-k\">if<\/span> <span class=\"pl-c1\">len<\/span>(i.values()[<span class=\"pl-c1\">0<\/span>])<span class=\"pl-k\">&gt;=<\/span><span class=\"pl-c1\">30<\/span>:<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L30\" class=\"blob-num js-line-number\" data-line-number=\"30\"><\/td>\n        <td id=\"file-word2vec_model-py-LC30\" class=\"blob-code blob-code-inner js-file-line\">        title<span class=\"pl-k\">=<\/span>i.keys()[<span class=\"pl-c1\">0<\/span>]   <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L31\" class=\"blob-num js-line-number\" data-line-number=\"31\"><\/td>\n        <td id=\"file-word2vec_model-py-LC31\" class=\"blob-code blob-code-inner js-file-line\">        <span class=\"pl-k\">for<\/span> q <span class=\"pl-k\">in<\/span> i.values()[<span class=\"pl-c1\">0<\/span>]:<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L32\" class=\"blob-num js-line-number\" data-line-number=\"32\"><\/td>\n        <td id=\"file-word2vec_model-py-LC32\" class=\"blob-code blob-code-inner js-file-line\">            x_train_RAW.append(q.encode(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>utf-8<span class=\"pl-pds\">&#39;<\/span><\/span>))<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L33\" class=\"blob-num js-line-number\" data-line-number=\"33\"><\/td>\n        <td id=\"file-word2vec_model-py-LC33\" class=\"blob-code blob-code-inner js-file-line\"> <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L34\" class=\"blob-num js-line-number\" data-line-number=\"34\"><\/td>\n        <td id=\"file-word2vec_model-py-LC34\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span>can use the ngrammer here if you want to look at phrase similarity<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L35\" class=\"blob-num js-line-number\" data-line-number=\"35\"><\/td>\n        <td id=\"file-word2vec_model-py-LC35\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span>I get rid of html characters from this corpus<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L36\" class=\"blob-num js-line-number\" data-line-number=\"36\"><\/td>\n        <td id=\"file-word2vec_model-py-LC36\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">def<\/span> <span class=\"pl-en\">spliter<\/span>(<span class=\"pl-smi\">jobpost<\/span>):<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L37\" class=\"blob-num js-line-number\" data-line-number=\"37\"><\/td>\n        <td id=\"file-word2vec_model-py-LC37\" class=\"blob-code blob-code-inner js-file-line\">    sentences2<span class=\"pl-k\">=<\/span>[]<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L38\" class=\"blob-num js-line-number\" data-line-number=\"38\"><\/td>\n        <td id=\"file-word2vec_model-py-LC38\" class=\"blob-code blob-code-inner js-file-line\">    s<span class=\"pl-k\">=<\/span>tknr.tokenize(jobpost)  <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L39\" class=\"blob-num js-line-number\" data-line-number=\"39\"><\/td>\n        <td id=\"file-word2vec_model-py-LC39\" class=\"blob-code blob-code-inner js-file-line\">    cleaned_words <span class=\"pl-k\">=<\/span> [<span class=\"pl-c1\">list<\/span>(translate(re.sub(<span class=\"pl-sr\"><span class=\"pl-k\">r<\/span><span class=\"pl-pds\">&#39;<\/span><span class=\"pl-c1\">[<\/span><span class=\"pl-c1\">0-9<\/span><span class=\"pl-c1\">]<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\-<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\\\<\/span>~<span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\`<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\@<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\$<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\%<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\^<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\&amp;<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\*<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\(<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\)<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\_<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\=<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\[<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\]<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\\\<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\&lt;<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\&lt;<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\&gt;<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\?<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\/<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\;<\/span><span class=\"pl-k\">|<\/span><span class=\"pl-cce\">\\\\<\/span><span class=\"pl-c1\">.<\/span><span class=\"pl-pds\">&#39;<\/span><\/span>,<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span> <span class=\"pl-pds\">&#39;<\/span><\/span>,sentence).lower().encode(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>utf-8<span class=\"pl-pds\">&#39;<\/span><\/span>),Trans).split()) <span class=\"pl-k\">for<\/span> sentence <span class=\"pl-k\">in<\/span> s]<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L40\" class=\"blob-num js-line-number\" data-line-number=\"40\"><\/td>\n        <td id=\"file-word2vec_model-py-LC40\" class=\"blob-code blob-code-inner js-file-line\">    <span class=\"pl-c\"><span class=\"pl-c\">#<\/span>two_three_ngrams = [ngrammer2(sent,num) for num in [1,2,3] for sent in cleaned_words]<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L41\" class=\"blob-num js-line-number\" data-line-number=\"41\"><\/td>\n        <td id=\"file-word2vec_model-py-LC41\" class=\"blob-code blob-code-inner js-file-line\">    <span class=\"pl-k\">for<\/span> U <span class=\"pl-k\">in<\/span> cleaned_words:<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L42\" class=\"blob-num js-line-number\" data-line-number=\"42\"><\/td>\n        <td id=\"file-word2vec_model-py-LC42\" class=\"blob-code blob-code-inner js-file-line\">        sentences2.append(U)<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L43\" class=\"blob-num js-line-number\" data-line-number=\"43\"><\/td>\n        <td id=\"file-word2vec_model-py-LC43\" class=\"blob-code blob-code-inner js-file-line\">    sentences2<span class=\"pl-k\">=<\/span><span class=\"pl-c1\">list<\/span>(chain(<span class=\"pl-k\">*<\/span>sentences2))<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L44\" class=\"blob-num js-line-number\" data-line-number=\"44\"><\/td>\n        <td id=\"file-word2vec_model-py-LC44\" class=\"blob-code blob-code-inner js-file-line\">    <span class=\"pl-k\">return<\/span> sentences2<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L45\" class=\"blob-num js-line-number\" data-line-number=\"45\"><\/td>\n        <td id=\"file-word2vec_model-py-LC45\" class=\"blob-code blob-code-inner js-file-line\"> <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L46\" class=\"blob-num js-line-number\" data-line-number=\"46\"><\/td>\n        <td id=\"file-word2vec_model-py-LC46\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span>i always do this, not sure why. <\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L47\" class=\"blob-num js-line-number\" data-line-number=\"47\"><\/td>\n        <td id=\"file-word2vec_model-py-LC47\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">import<\/span> random<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L48\" class=\"blob-num js-line-number\" data-line-number=\"48\"><\/td>\n        <td id=\"file-word2vec_model-py-LC48\" class=\"blob-code blob-code-inner js-file-line\">random.shuffle(x_train_RAW)<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L49\" class=\"blob-num js-line-number\" data-line-number=\"49\"><\/td>\n        <td id=\"file-word2vec_model-py-LC49\" class=\"blob-code blob-code-inner js-file-line\"> <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L50\" class=\"blob-num js-line-number\" data-line-number=\"50\"><\/td>\n        <td id=\"file-word2vec_model-py-LC50\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c\"><span class=\"pl-c\">#<\/span>going to multiprocess the tokenizer to make it faster<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L51\" class=\"blob-num js-line-number\" data-line-number=\"51\"><\/td>\n        <td id=\"file-word2vec_model-py-LC51\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">from<\/span> multiprocessing <span class=\"pl-k\">import<\/span> Pool,cpu_count<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L52\" class=\"blob-num js-line-number\" data-line-number=\"52\"><\/td>\n        <td id=\"file-word2vec_model-py-LC52\" class=\"blob-code blob-code-inner js-file-line\">pool<span class=\"pl-k\">=<\/span>Pool(cpu_count())<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L53\" class=\"blob-num js-line-number\" data-line-number=\"53\"><\/td>\n        <td id=\"file-word2vec_model-py-LC53\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-c1\">print<\/span> <span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>starting to sentence tokenize<span class=\"pl-pds\">&#39;<\/span><\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L54\" class=\"blob-num js-line-number\" data-line-number=\"54\"><\/td>\n        <td id=\"file-word2vec_model-py-LC54\" class=\"blob-code blob-code-inner js-file-line\">x_train_RAW<span class=\"pl-k\">=<\/span><span class=\"pl-c1\">filter<\/span>(<span class=\"pl-c1\">None<\/span>,pool.map(spliter,x_train_RAW))<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L55\" class=\"blob-num js-line-number\" data-line-number=\"55\"><\/td>\n        <td id=\"file-word2vec_model-py-LC55\" class=\"blob-code blob-code-inner js-file-line\"> <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L56\" class=\"blob-num js-line-number\" data-line-number=\"56\"><\/td>\n        <td id=\"file-word2vec_model-py-LC56\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">import<\/span> gensim<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L57\" class=\"blob-num js-line-number\" data-line-number=\"57\"><\/td>\n        <td id=\"file-word2vec_model-py-LC57\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">from<\/span> multiprocessing <span class=\"pl-k\">import<\/span> cpu_count<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L58\" class=\"blob-num js-line-number\" data-line-number=\"58\"><\/td>\n        <td id=\"file-word2vec_model-py-LC58\" class=\"blob-code blob-code-inner js-file-line\">model <span class=\"pl-k\">=<\/span> gensim.models.Word2Vec(x_train_RAW, <span class=\"pl-v\">size<\/span><span class=\"pl-k\">=<\/span><span class=\"pl-c1\">100<\/span>, <span class=\"pl-v\">window<\/span><span class=\"pl-k\">=<\/span><span class=\"pl-c1\">5<\/span>, <span class=\"pl-v\">min_count<\/span><span class=\"pl-k\">=<\/span><span class=\"pl-c1\">5<\/span>, <span class=\"pl-v\">workers<\/span><span class=\"pl-k\">=<\/span>cpu_count())<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-word2vec_model-py-L59\" class=\"blob-num js-line-number\" data-line-number=\"59\"><\/td>\n        <td id=\"file-word2vec_model-py-LC59\" class=\"blob-code blob-code-inner js-file-line\">pickle.dump(model,<span class=\"pl-c1\">open<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>model.p<span class=\"pl-pds\">&#39;<\/span><\/span>,<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>wb<span class=\"pl-pds\">&#39;<\/span><\/span>))<\/td>\n      <\/tr>\n<\/table>\n\n  <\/div>\n\n  <\/div>\n  \n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/KayneWest/dc005e9e596e77496395/raw/a569f128e583ae227c976f9688140d065da93c7a/word2vec_model.py\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/KayneWest/dc005e9e596e77496395#file-word2vec_model-py\">word2vec_model.py<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')