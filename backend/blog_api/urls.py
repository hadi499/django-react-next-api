from .views import PostList, CreatePost, PostDetail, DeletePost, EditPost
from django.urls import path

app_name = 'blog_api'

urlpatterns = [
    path('', PostList.as_view(), name='listpost'),    
    path('create/', CreatePost.as_view(), name='createpost'),
    path('post/<str:pk>/', PostDetail.as_view(), name='detailpost'),
    path('delete/<int:pk>/', DeletePost.as_view(), name='deletepost'),
    path('edit/<int:pk>/', EditPost.as_view(), name='editpost'),
]
