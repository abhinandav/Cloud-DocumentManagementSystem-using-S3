
class Get_Book(APIView):
    def get(self,request,book_id):
        book=Books.objects.get(id=book_id)
        serializer=BookSerializer(book)
        return  Response(serializer.data,status=status.HTTP_200_OK  )      
                        
                        
                        
class Borrow(APIView):
    def post(self,request,book_id):
        book=Book.objects.get(id=book_id)
        if book.is_available:
            if book.quantity>0:
                book.quantity-=1
                if book.quantity==0:
                    book.is_available=False
                book.save()
        return Response(status=status.HTTP_200_OK)


class ReturnBook(APIView):
    def post(self,request,book_id):
        book=books.objects.get(id=book_id)
        book.quantity+=1
        book.save()
        return Response(status=status.HTTP_200_OK)


class CheckAvailability(APIView):
    def get(self,request,book_id):
        book=books.objects.get(id=book_id)
        return Response('is_available',book.is_available,status=status.HTTP_200_OK)        
                


class BookSearch(ListAPIView):
    serialize=Bookserilaizer
    def get_quereyset(self):
        books=Books.objects.all()
        author=self.request.querey_params.get('author',None)
        genre=self.request.querey_params.get('genre',None)
        year=self.request.querey_params.get('year',None)

        if author:
            books.filter(author__icontains=author)
        if genre:
            books.filter(genre__icontains=genre)
        if year:
            books.filter(created_at__icontains=year)




#end points

urlspatterns=[
    path('get_book/<int:pk>/',views.Get_Book.as_view()),
    path('borrow/<int:pk>/',views.Borrow.as_view()),
    path('return_book/<int:pk>/',views.ReturnBook.as_view()),
    path('check_availability/<int:pk>/',views.CheckAvailability.as_view()),


]
                
                


                
                
                
                
                
                
                
                
                
                
                
                
                
                
                